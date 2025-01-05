import React from "react";

import Carousel from "../../../Components/carousel/Carousel";
import useFetch from "../../../Hooks/useFetch";

const Similar = ({ media_type, id }) => {
    const { data, loading, error } = useFetch(`/${media_type}/${id}/similar`);

    const title = media_type === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            media_type={media_type}
        />
    );
};

export default Similar;