resource "aws_ecs_cluster" "main" {
  name = "vet-cluster"
}

resource "aws_ecs_task_definition" "reservas" {
  family                   = "reservas-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([{
    name  = "reservas"
    image = "${aws_ecr_repository.backend.repository_url}:latest"
    portMappings = [{ containerPort = 4000 }]
    environment = [
      { name = "DB_HOST",     value = aws_db_instance.reservas.address },
      { name = "DB_PORT",     value = tostring(aws_db_instance.reservas.port) },
      { name = "DB_USERNAME", value = "postgres" },
      { name = "DB_PASSWORD", value = "postgres123" },   # mover luego a Secrets
      { name = "DB_NAME",     value = "veterinaria_goicochea" }
    ]
    healthCheck = {
      command     = ["CMD-SHELL", "wget -qO- http://localhost:4000/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 10
    }
  }])
}

resource "aws_ecs_service" "reservas" {
  name            = "reservas-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.reservas.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = aws_subnet.private[*].id       # <— PRIVADAS
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = false                         # <— SIN IP PÚBLICA
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.reservas_tg.arn
    container_name   = "reservas"
    container_port   = 4000
  }

  depends_on = [
    aws_lb_target_group.reservas_tg,
    aws_db_instance.reservas
  ]
}
