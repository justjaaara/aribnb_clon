import prisma from '@/app/libs/prismadb';
import { IQueryOptions } from './getListings';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

interface IQuery extends IQueryOptions {
    listingId?: string;
    listing?: { userId: string };

}

export default async function getReservations(
    params:IParams
) {
    try {
        const { listingId, userId, authorId } = await params;

        const query: IQuery = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString()
                }
            })
        );

        return safeReservations;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
}