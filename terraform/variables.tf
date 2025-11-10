variable "db_password" {
  type      = string
  sensitive = true
}

variable "ecr_image_reserva" {
  type        = string
  description = "ECR image URI for reserva service"
}

variable "ecr_image_pago" {
  type        = string
  description = "ECR image URI for pago service"
}

variable "ecr_image_frontend" {
  type        = string
  description = "ECR image URI for frontend"
}
