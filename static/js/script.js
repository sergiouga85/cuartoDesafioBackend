const socket = io() // Inicia la conexion

document.querySelector('#btn')?.addEventListener('click', ()=>{

try {
    const title =document.querySelector('#titulo').value
    const description=document.querySelector('#descripcion').value
    const category= document.querySelector('#categoria').value
    const code= document.querySelector('#codigo').value
    const price= document.querySelector('#precio').value
    const stock= document.querySelector('#stock').value
    

    // Verifica que todos los campos contengan datos
    if (!title || !description || !category || !code || !price|| !stock) throw new Error('Todos los campos son obligatorios')
    // Crea un objeto de salida con los valores de los campos
    const nuevoProducto = {
      title: title,
      description: description,
      category: category,
      code: code,
      price: parseFloat(price),
      stock: parseInt(stock)
      
    }
    // Envia al servidor el producto agregado y recibe un callback con la respuesta
    
        socket.emit('agregarProducto', nuevoProducto, (res) => {
            if (res.status.status === 'Ok') {
                console.log('El producto fue agregado correctamente')
                document.querySelector('#titulo').value = ''
                document.querySelector('#descripcion').value = ''
                document.querySelector('#categoria').value = ''
                document.querySelector('#codigo').value = ''
                document.querySelector('#precio').value = ''
                document.querySelector('#stock').value = ''
            }else {
                console.log('El producto no fue agregado')
            }

        })
    }catch(error){
        console.log('El producto no fue agregado')
    }  
           
})
    

// Maneja el evento ACTUALIZACIÓN que se dispara cuando algún cliente crea un nuevo producto, o cuando se conecta
socket.on('actualizacion', async ({productos}) => {
    console.log(productos)
    const tabla = document.querySelector('#productsTable')
    tabla.innerHTML = ''
    for(const producto of productos){
      const fila = document.createElement('tr')
      fila.innerHTML = `
          <th scope="row">${producto.id}</th>
          <td>${producto.title}</td>
          <td>${producto.description}</td>
          <td>${producto.category}</td>
          <td>${producto.code}</td>
          <td>${producto.price}</td>
          <td>${producto.stock}</td>
          `
      tabla.appendChild(fila)
    }
  })



