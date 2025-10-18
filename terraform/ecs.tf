resource "aws_ecs_cluster" "main" {
  name = "vet-cluster"
}

# Task definition: reserva
resource "aws_ecs_task_definition" "reserva" {
  family                   = "reserva-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = <<DEFS
[
  {
    "name": "reserva",
    "image": "${var.ecr_image_reserva}",
    "essential": true,
    "portMappings": [
      { "containerPort": 8080, "protocol": "tcp" }
    ],
    "environment": [
      { "name": "DB_HOST", "value": "${aws_db_instance.rds_instance.address}" }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/reserva",
        "awslogs-region": "us-east-2",
        "awslogs-stream-prefix": "reserva"
      }
    }
  }
]
DEFS
}

# Task definition: pago
resource "aws_ecs_task_definition" "pago" {
  family                   = "pago-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = <<DEFS
[
  {
    "name": "pago",
    "image": "${var.ecr_image_pago}",
    "essential": true,
    "portMappings": [
      { "containerPort": 8080, "protocol": "tcp" }
    ],
    "environment": [
      { "name": "DB_HOST", "value": "${aws_db_instance.rds_instance.address}" }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/pago",
        "awslogs-region": "us-east-2",
        "awslogs-stream-prefix": "pago"
      }
    }
  }
]
DEFS
}

# Services (Fargate) - reserva
resource "aws_ecs_service" "reserva_svc" {
  name            = "reserva-svc"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.reserva.arn
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets         = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.reserva_tg.arn
    container_name   = "reserva"
    container_port   = 8080
  }

  depends_on = [aws_lb_listener.http]
}

# Services (Fargate) - pago
resource "aws_ecs_service" "pago_svc" {
  name            = "pago-svc"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.pago.arn
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets         = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.pago_tg.arn
    container_name   = "pago"
    container_port   = 8080
  }

  depends_on = [aws_lb_listener.http]
}
