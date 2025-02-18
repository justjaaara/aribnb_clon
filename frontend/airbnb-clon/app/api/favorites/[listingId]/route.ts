import { NextResponse, NextRequest } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    // Extraer el listingId de la URL
    const url = request.url; // Obtener la URL completa
    const parts = url.split('/'); // Dividir la URL en partes
    const listingId = parts[parts.length - 1]; // El ID es el último segmento

    // Validar el listingId
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Actualizar los favoritos del usuario
    const favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}


export async function DELETE(
    request: NextRequest
){
    const currentUser = await getCurrentUser();

    if (!currentUser){
        return NextResponse.error();
    }


    // Extraer el listingId de la URL
    const url = request.url; // Obtener la URL completa
    const parts = url.split('/'); // Dividir la URL en partes
    const listingId = parts[parts.length - 1]; // El ID es el último segmento


    if (!listingId || typeof listingId !== 'string') {
        console.log(listingId);
        console.log(typeof(listingId));
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);


}
