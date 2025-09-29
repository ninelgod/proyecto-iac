
resource "aws_lb" "app" {
  name               = "reserva-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public1.id]
  security_groups    = [aws_security_group.alb_sg.id]
}

resource "aws_lb_target_group" "reserva_tg" {
  name     = "reserva-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.reserva_tg.arn
  }
}
