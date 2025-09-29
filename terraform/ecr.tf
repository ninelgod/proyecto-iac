resource "aws_ecr_repository" "backend" {
  name                 = "vet-backend"
  image_tag_mutability = "MUTABLE"

  tags = {
    Name = "vet-backend"
  }
}
