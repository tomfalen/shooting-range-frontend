import React, {useContext, useEffect, useState} from "react";
import api from "./api";
import authContext from "../../store";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function ClientRegulations() {
    const [{ sessionId }] = useContext(authContext);
    const [clientRegulations, setClientRegulations] = useState({
        data: []
    });

    useEffect(() => {
        GetClientAccteptedRegulations();
    }, []);

    function GetClientAccteptedRegulations() {
        api.getAcceptedRegulations(sessionId)
            .then((response) => {
                setClientRegulations({ data: response.data });
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Accepted regulations
            </Typography>
            <hr />
            <br />
            <Grid justify="center" container spacing={3}>
                <div>
                    // -> zawartość regulaminu wyświetlić tylko jak serwer zadziała żeby wiedzieć jak wygląda<br />
                    // -> https://github.com/CondeNast/xml-to-react<br /><br/>
                    // -> do obsłużenia ponowna akceptacja regulaminu, trzeba znać id regulaminu<br />
                    // -> nie wiem jak to obsłużyć :(<br /><br />
                    // -> na głównym widoku może nie przechodzić od razu do informacji o kliencie tylko skorzystać z metod ogólnych i wyświetlić mu regulamin strzelnicy, godziny otwarcia, wolne dni itp.?
                </div>
            </Grid>
        </div>
    )
}