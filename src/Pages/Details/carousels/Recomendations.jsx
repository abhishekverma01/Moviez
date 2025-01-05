import React from "react";

import Carousel from "../../../Components/carousel/Carousel";
import useFetch from "../../../Hooks/useFetch";

const Recommendation = ({ media_type, id }) => {
    const { data, loading, error } = useFetch(
        `/${media_type}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            media_type={media_type}
        />
    );
};

export default Recommendation;