from typing import List
from unicodedata import category
from fastapi import FastAPI, status, HTTPException, Depends
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import models
import schemas






Base.metadata.create_all(engine)

# Iniciando o app
app = FastAPI()

# Funcao para a sessao
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()



@app.get("/")
def root():
    return "produto"

@app.post("/product", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, session: Session = Depends(get_session)):

    # criando uma instancia para o database da model Produto
    productdb = models.Product(name = product.name, price = product.price, serie = product.serie)

    # adicionando para a sessao e comitando
    session.add(productdb)
    session.commit()
    session.refresh(productdb)

    # retornando o produto criado
    return productdb

@app.get("/product/{id}", response_model=schemas.Product)
def read_product(id: int, session: Session = Depends(get_session) ):
     
    # tendo o produto com o seu ID
    product = session.query(models.Product).get(id)

    # checando se existesse um produto com essa ID. Se nao , ele responde com um erro 404 not found 
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com id {id} nao encontrado")

    return product


@app.put("/product/{id}")
def update_product(id: int, name: str, price:int, serie: int, session: Session = Depends(get_session)):
   
    # tendo o produto com o seu ID
    product = session.query(models.Product).get(id)

    # update dos itens do produto (se o seu id for encontrado)
    if product:
        product.name = name
        product.price = price
        product.serie = serie

        session.commit()


    # checando se existesse um produto com essa ID. Se nao , ele responde com um erro 404 not found
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return product

@app.delete("/product/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(id: int, session: Session = Depends(get_session)):
 
    #  # tendo o produto com o seu ID
    product = session.query(models.Product).get(id)

    # Se o id do produto existe ele deleta do database. Caso nao ele informa um erro 404.
    if product:
        session.delete(product)
        session.commit()
       
    else:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return None

@app.get("/product", response_model = List[schemas.Product])
def read_product_list(session: Session = Depends(get_session)):

    # tem todos os produtos
    product_list = session.query(models.Product).all()

    return product_list




# CRUD da model Category




@app.post("/category", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.CategoryCreate, session: Session = Depends(get_session)):

    # criando uma instancia para o database da model Category
    categorydb = models.Category(name = category.name)

    # adicionando para a sessao e comitando
    session.add(categorydb)
    session.commit()
    session.refresh(categorydb)

    # retornando o produto criado
    return categorydb

@app.get("/category/{id}", response_model=schemas.Category)
def read_category(id: int, session: Session = Depends(get_session) ):
     
    # tendo a categoria com o seu ID
    category = session.query(models.Category).get(id)

    # checando se existesse uma categoria com essa ID. Se nao , ele responde com um erro 404 not found 
    if not category:
        raise HTTPException(status_code=404, detail=f"Categoria com id {id} nao encontrado")

    return category


@app.put("/category/{id}")
def update_category(id: int, name: str, session: Session = Depends(get_session)):
   
    # tendo a categoria com o seu ID
    category = session.query(models.Category).get(id)

    # update dos itens da categoria (se o seu id for encontrado)
    if category:
        category.name = name
        
        session.commit()

    # checando se existesse uma categoria com essa ID. Se nao , ele responde com um erro 404 not found
    if not category:
        raise HTTPException(status_code=404, detail=f"Categoria com o id {id} nao encontrado!")

    return category

@app.delete("/category/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(id: int, session: Session = Depends(get_session)):
 
    #  # tendo a categoria com o seu ID
    category = session.query(models.Category).get(id)

    # Se o id da categoria existe ele deleta do database. Caso nao ele informa um erro 404.
    if category:
        session.delete(category)
        session.commit()
       
    else:
        raise HTTPException(status_code=404, detail=f"Categoria com o id {id} nao encontrado!")

    return None

@app.get("/category", response_model = List[schemas.Category])
def read_category_list(session: Session = Depends(get_session)):

    # tem todas as categorias
    category_list = session.query(models.Category).all()

    return category_list