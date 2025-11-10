resource "aws_ecr_repository" "reserva" {
  name = "reserva"
}

resource "aws_ecr_repository" "pago" {
  name = "pago"
}

resource "aws_ecr_repository" "frontend" {
  name = "frontend"
}
