import React, {useContext, useEffect, useState} from "react";
import api from "./api";
import authContext from "../../store";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import XMLToReact from '@condenast/xml-to-react';

export default function ClientRegulations() {
    const [{ sessionId }] = useContext(authContext);
    const [clientRegulations, setClientRegulations] = useState({
        data: ''
    });

    useEffect(() => {
        GetClientAccteptedRegulations();
    },[]);

    function GetClientAccteptedRegulations() {
        api.getAcceptedRegulations(sessionId)
            .then((response) => {
                setClientRegulations({ data: response.data.substr(response.data.indexOf('<regulations>'), response.data.indexOf('</regulations>')) });
            }).catch((error) => {
            console.log(error)
        })
    }

    const xmlToReact = new XMLToReact({
        regulations: (attrs) => ({ type: RegulationTag, props: attrs }),
        chapter: (attrs) => ({ type: ChapterTag, props: attrs }),
        point: (attrs) => ({ type: PointTag, props: attrs })
    });

    const regulations = xmlToReact.convert(
        clientRegulations.data
    );

    function RegulationTag({children}) {
        return <div>{children}</div>;
    }

    function ChapterTag({title, children}) {
        return <span><h1>{title}</h1>{children}</span>;
    }

    function PointTag({number, children}) {
        return <p>{number}. {children}</p>;
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Zaakceptowany regulamin
            </Typography>
            <hr />
            <br />
            <Grid container spacing={3}>
                {regulations}
            </Grid>
        </div>
    )
}