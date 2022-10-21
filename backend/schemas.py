from pydantic import BaseModel

# Criando um Schema para o Produto (Pydantic Model)
class ProductCreate(BaseModel):
    name: str
    price: int
    serie: int


# Crindo uma class Produto com Base Model
class Product(BaseModel):
    id: int
    name: str
    price: int
    serie: int

    class Config:
        orm_mode = True


# Criando um Schema para o Produto (Pydantic Model)
class CategoryCreate(BaseModel):
    name: str
    


# Crindo uma class Produto com Base Model
class Category(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True        