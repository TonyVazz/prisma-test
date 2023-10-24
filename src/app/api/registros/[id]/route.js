import { NextResponse } from "next/server";
import {prisma} from "@/libs/prisma"

export async function GET(request, {params:{id}}){
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })

        if(!estudiante){
            return NextResponse.json({mensaje: 'El estudiante no existe'},{status: 404})
        }
        return NextResponse.json(estudiante)
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message},{status: 500})
        }
    }
   
}

export async function DELETE(request, {params:{id}}){
    try {
        //esto se pone en cada individual para asi leer por su id
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!estudiante){
            return NextResponse.json({mensaje: 'El estudiante no existe'},{status: 404})
        }
        //hasta aqui es lo mismo
        //aqui seleccionamos el id que queremos eliminar
        await prisma.estudiante.delete({
            where:{
                id: Number(id)
            } 

        })
        //mensaje de estudiante eliminado, checamos en le get general
        return NextResponse.json({
        mensaje: 'Un estudiante Eliminado'
    })
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message},{status: 500})
        }
    }
    
}

export async function PUT(request, {params:{id}}){
    try {
        //esto se pone en cada individual para asi leer por su id
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!estudiante){
            return NextResponse.json({mensaje: 'El estudiante no existe'},{status: 404})
        }
         //hasta aqui es lo mismo
        //desestructirizamos el body
        const {nombre, genero, edad, carrera} = await request.json()
        //coloque el const actualizar estudiante en caso de querer mostras lo modificado pero
        //en este caso solo muestro un mensaje de estudiante actualizado y lo checo haciendo un get
        //general para ver si se modifico o igual se podria checar con un get y el id
        const actualizarEstudiante = await prisma.estudiante.update({
        where:{
            id: Number(id)
        },
        //el body
        data:{
            nombre,
            genero,
            edad,
            carrera
        }
    })
    
    return NextResponse.json({mensaje: "estudiante actualizado"});

        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message},{status: 500})
        }
    }
    
}
