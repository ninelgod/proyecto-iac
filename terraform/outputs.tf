output "ecr_api_endpoint" {
  value = aws_vpc_endpoint.ecr_api.dns_entry
}

output "ecr_dkr_endpoint" {
  value = aws_vpc_endpoint.ecr_dkr.dns_entry
}

output "s3_endpoint" {
  value = aws_vpc_endpoint.s3.dns_entry
}
