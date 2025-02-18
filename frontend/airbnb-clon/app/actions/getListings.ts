import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  bathroomCount?: number;
  category?: string;
  endDate?: string;
  guestCount?: number;
  locationValue?: string;
  roomCount?: number;
  startDate?: string;
  userId?: string;
}

export interface IQueryOptions {

  bathroomCount?: { gte: number };
  category?: string;
  guestCount?: { gte: number };
  locationValue?: string;
  roomCount?: { gte: number };
  userId?: string;
  NOT?: object;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { 
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category
     } = await params;

    const query: IQueryOptions = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount 
      } 
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate},
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error(error);
  }
}