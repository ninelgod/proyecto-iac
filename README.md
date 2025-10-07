# Proyecto Veterinaria Goicochea - Infraestructura como Código

## Integrantes:
- Alfaro Loyola, Emilio
- Saldarriaga Urquizo, Pedro
- Toribio Flores, Joe
- Rivas Machuca, Marlon
- Colona Chavez, Fabricio
  
Este proyecto implementa la infraestructura y el despliegue de la aplicación **Veterinaria Goicochea** utilizando **Terraform**, **Docker**, **AWS ECS Fargate**, **Amazon RDS** y **Application Load Balancer (ALB)**.  
La aplicación permite gestionar reservas y pagos, integrándose con MercadoPago y desplegándose en un entorno seguro en la nube de AWS.

---

## Descripción de la Infraestructura

- **VPC personalizada** con subredes públicas y privadas.
- **Application Load Balancer (ALB)** en subredes públicas para distribuir tráfico HTTP.
- **ECS Fargate** para ejecutar contenedores de la aplicación backend.
- **Amazon RDS (PostgreSQL)** en subredes privadas para la base de datos.
- **Amazon ECR** para almacenar imágenes Docker de la aplicación.
- **VPC Endpoints** para acceso privado a ECR y S3 sin exponer tráfico a Internet.
- **Security Groups** configurados para aislar tráfico:
  - ALB accesible desde Internet (puerto 80).
  - ECS solo accesible desde el ALB (puerto 4000).
  - RDS solo accesible desde ECS.

---

## Requisitos

- [Terraform >= 1.6](https://developer.hashicorp.com/terraform/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [AWS CLI](https://docs.aws.amazon.com/cli/)
- Cuenta de AWS con credenciales configuradas (`aws configure`)

---

## Estructura de Archivos .tf
terraform/  
│── alb.tf  
│── ecs.tf  
│── ecr.tf  
│── iam.tf  
│── rds.tf  
│── security.tf  
│── vpc.tf  
│── vpc_endpoints.tf  
│── data.tf  
│── providers.tf  
│── outputs.tf

---
  ## Comando para conectar con aws
      sudo aws config
  ## Comandos Principales de Terraform
  
  ### Inicializar Terraform
      cd terraform
      sudo terraform init
  ### Planificar los cambios
      sudo terraform plan
  ### Aplicar los cambios en AWS
      sudo terraform apply
  ### Ver salidas definidas en outputs.tf
      sudo terraform output
---
  ## Construcción y despliegue de la imagen Docker
  
  ### Construir la imagen backend
    cd backend
    sudo docker build -t vet-backend .
  ### Etiquetar la imagen para ECR
    sudo docker tag vet-backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/vet-backend:latest
  ### Autenticarse en ECR
    sudo aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com
  ### Subir la imagen a ECR
    sudo docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/vet-backend:latest
