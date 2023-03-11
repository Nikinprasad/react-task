import * as React from "react";

import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { DividedList } from "../../components/lists";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";

import http from "../../services/httpService";

import { isExpired } from "react-jwt";

import { Link, useNavigate } from "react-router-dom";

export default function ListAppointment() {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user == null) { navigate("/"); }
    else {
      if (isExpired(user.token)) { navigate("/"); localStorage.removeItem("user") }
      else {
        const fetchData = async () => {
          await http
            .get(`appointments/all/${user.id}`)
            .then((res) => {
              setData(res.data);
              console.log("Data Received successfully");
            })
            .catch((err) => {
              console.error("Error:" + err);
            });
        };
        fetchData();
      }
    }
    // console.log(user.token)

  }, []);

  return (
    <>
      <Button
        component={Link}
        to="/add"
        sx={{ margin: "10px 0px" }}
        startDecorator={<Add />}
      >
        Create
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 5
        }}
      >
        <List
          variant="outlined"
          sx={{
            bgcolor: "background.body",
            minWidth: 240,
            borderRadius: "8px",
            boxShadow: "sm",
            "--List-decorator-size": "48px",
            "--List-item-paddingLeft": "1.5rem",
            "--List-item-paddingRight": "1rem",
            gridColumn: "1/-1",
            display: { xs: "none", sm: "grid" },
            gridTemplateColumns: "0.5fr 1fr 1fr 1fr 1fr 1fr",
            "& > *": {
              p: 2,
              "&:nth-of-type(n):not(:nth-last-of-type(-n+6))": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            },
          }}
        >
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              ID
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              Title
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              Description
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              Date of Appointment
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              FileName
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography level="h6" noWrap>
              Actions
            </Typography>
          </ListItem>
          {data.length > 0
            ? data.map((datas, index) => (
              <DividedList
                key={index}
                id={datas.id}
                title={datas.title}
                description={datas.description}
                date={datas.datetime}
                filename={datas.filename}
                file={datas.file}
              ></DividedList>
            ))
            : ""}
        </List>
      </Box>
    </>
  );
}
