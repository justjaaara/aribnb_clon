

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservation from "@/app/actions/getReservations";


const ListingPage = async ({ params }: {params: Promise<{ listingId: string }>}) => {
    const listingId = (await params).listingId

    const listing = await getListingById({ listingId });
    const reservations = await getReservation({ listingId });
    const currentUser = await getCurrentUser();

    if (!listing) {
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage;
