resource "aws_db_subnet_group" "reservas" {
  name       = "reservas-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_db_instance" "reservas" {
  identifier             = "reservas-db"
  engine                 = "postgres"
  engine_version         = "17.6"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "veterinaria_goicochea"
  username               = "postgres"
  password               = "postgres123"  # luego a Secrets Manager
  db_subnet_group_name   = aws_db_subnet_group.reservas.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id] 
  publicly_accessible    = false
  skip_final_snapshot    = true
  multi_az               = false
  storage_type           = "gp2"
}
