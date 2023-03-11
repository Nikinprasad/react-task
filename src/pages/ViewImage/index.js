import * as React from "react";
import data from "../../components/data.json";
import { ImageCards } from "../../components/cards";
import { Grid } from "@mui/joy";

export default function ViewImage() {
  //   const [data, setData] = React.useState();
  //   React.useEffect(() => {
  //     async function fetchData() {
  //       const x = fetch(
  //         "https://api.json-generator.com/templates/Ue8On_lEgdI5/data"
  //       );
  //       setData(x);
  //       console.log(data);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <Grid sx={{ flexGrow: 2 }} container spacing={4}>
      <Grid xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {data.length > 0
            ? data.map((datas, index) => (
              <Grid>
                <ImageCards
                  imgSrc={datas.src}
                  header={datas.id}
                  imageAlt={datas.username}
                />
              </Grid>
            ))
            : ""}
        </Grid>
      </Grid>
    </Grid>
  );
}
