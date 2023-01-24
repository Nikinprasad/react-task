import * as React from "react";

import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation } from "react-router-dom";

import http from "../../services/httpService";

export default function EditAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [description, setDescription] = React.useState(
    location.state.description
  );
  const [title, setTitle] = React.useState(location.state.title);
  const [datetime, setDatetime] = React.useState(location.state.date);

  const handleSubmit = async (event) => {
    var x = dayjs(datetime.$d).format("YYYY-MM-DD");
    await http
      .put("updateAppointment/" + location.state.id, {
        title,
        description,
        datetime: x,
      })
      .then((res) => {
        console.log("Appointment updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:" + err);
      });
  };

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <>
      <Typography level="h2" mb={5}>
        Update Appointment
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Textarea
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          size="lg"
          sx={{ mb: 1, minWidth: 400 }}
        />
        <Textarea
          placeholder="Description"
          minRows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          sx={{ mb: 1, minWidth: 400 }}
          size="lg"
          endDecorator={
            <Typography level="body3" sx={{ ml: "auto" }}>
              {description.length} character(s)
            </Typography>
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={datetime}
            shouldDisableDate={isWeekend}
            disablePast
            inputFormat="YYYY-MM-DD"
            onChange={(newValue) => {
              setDatetime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button onClick={() => handleSubmit()} sx={{ minWidth: 300 }}>
          Update
        </Button>
      </Box>
    </>
  );
}
