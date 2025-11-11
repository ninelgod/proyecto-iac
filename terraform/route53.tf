data "aws_route53_zone" "main" {
  name = "vetgoicochea.site"
}

resource "aws_route53_record" "alb" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "vetgoicochea.site"
  type    = "A"

  alias {
    name                   = aws_lb.app.dns_name
    zone_id                = aws_lb.app.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.vetgoicochea.site"
  type    = "CNAME"
  ttl     = 300
  records = ["vetgoicochea.site"]
}
