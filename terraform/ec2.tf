resource "aws_instance" "web_server" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 (us-east-2)
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public_a.id

  tags = {
    Name = "web-server"
  }
}
