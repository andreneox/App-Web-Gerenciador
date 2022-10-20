from fastapi import FastAPI, status
from fastapi import HTTPException
from database import Base, engine, Product
from pydantic import BaseModel
from sqlalchemy.orm import Session

# Create ToDoRequest Base Model
class ProductRequest(BaseModel):
    name: str
    price: int
    serie: int


# Create the database
Base.metadata.create_all(engine)

# Initialize app
app = FastAPI()



@app.get("/")
def root():
    return "produto"

@app.post("/product", status_code=status.HTTP_201_CREATED)
def create_product(product: ProductRequest):
 # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # create an instance of the ToDo database model
    productdb = Product(name = product.name, price = product.price, serie = product.serie)

    # add it to the session and commit it
    session.add(productdb)
    session.commit()

    # grab the id given to the object from the database
    id = productdb.id

    # close the session
    session.close()

    # return the id
    return f"criado um produto com a id {id}"

@app.get("/product/{id}")
def read_product(id: int):
     # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get the todo item with the given id
    product = session.query(Product).get(id)

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com id {id} nao encontrado")

    return product


@app.put("/product/{id}")
def update_product(id: int):
    return "atualizar um produto com a id {id}"

@app.delete("/product/{id}")
def delete_product(id: int):
    return "deletar um produto com a id {id}"

@app.get("/product")
def read_product_list():
     # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get all todo items
    product_list = session.query(Product).all()

    # close the session
    session.close()

    return product_list
