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
import Dropzone, { useDropzone } from 'react-dropzone';
import Header from "../../layout/Layout";

import { IconButton } from "@mui/joy";
import { ArrowBackIosNew } from "@mui/icons-material";


import http from "../../services/httpService";
import uploadService from "../../services/uploadService";

import capitalizeWords from "../../utils/capitalizeWords";

import { isExpired } from "react-jwt";
import { borderRadius } from "@mui/system";



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px',
  marginBottom: '40px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#054DA7',
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export default function CreateAppointment() {
  const navigate = useNavigate();
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [datetime, setDatetime] = React.useState(dayjs(new Date()));
  const [userId, setUserId] = React.useState();
  const [page, setPage] = React.useState(1);
  const [selectedFiles, setSelectedFiles] = React.useState();
  // const datetime = "2017-11-01";

  const {
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "*" });

  const style = React.useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const onDrop = (files) => {
    console.log(files)
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  }

  React.useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.id);
    if (user == null) { navigate("/login"); }
    else {
      if (isExpired(user.token)) { navigate("/login"); localStorage.removeItem("user") }
      else { }
    }
  }, [])

  // const fileChangeHandle = (event) => {
  //   setCurrentFile(event.target.value)
  // }

  const handleSubmit = async () => {
    var x = dayjs(datetime.$d).format("YYYY-MM-DD");

    await uploadService.upload({
      file: selectedFiles[0],
      title: capitalizeWords(title),
      description: description[0].toUpperCase() + description.slice(1),
      datetime: x,
      user_id: userId
    }, userId).then((res) => {
      console.log("User added successfully");
      navigate("/");
    })
      .catch((err) => {
        console.error("Error:" + err);
      });


    // await http
    //   .post("appointments/create", {
    //     title: capitalizeWords(title),
    //     description: description[0].toUpperCase() + description.slice(1),
    //     datetime: x,
    //     user_id: userId,

    //   })
    //   .then((res) => {
    //     console.log("User added successfully");
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.error("Error:" + err);
    //   });
  };

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <>
      <Header align="left">
        <IconButton
          size="md"
          variant="solid"
          color="primary"
          onClick={() => { page === 1 ? navigate(-1) : setPage(1) }}
        >
          <ArrowBackIosNew />
        </IconButton>
      </Header>
      <Typography level="h2" mb={5}>
        Create Appointment
      </Typography>

      {/* ---------------------------------Render Page--------------------------------- */}


      {page === 1 ?
        //---------------------------------PAGE 1---------------------------------
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
            onChange={(event) => { setTitle(event.target.value) }}
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
              sx={{ borderRadius: '8px' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          {/* <Button onClick={() => handleSubmit()} sx={{ minWidth: 300 }}>
          Create
        </Button> */}
          <Button onClick={() => setPage(2)} sx={{ minWidth: 300 }}>
            Next
          </Button>
        </Box> :

        //---------------------------------PAGE 2---------------------------------
        <>
          <Dropzone onDrop={(e) => onDrop(e)} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  {selectedFiles && selectedFiles[0].name ? (
                    <div className="selected-file">
                      {selectedFiles && selectedFiles[0].name}
                    </div>
                  ) : (
                    "Drag and drop file here, or click to select file"
                  )}
                </div>
              </div>
            )}
          </Dropzone>
          <Button onClick={() => handleSubmit()} sx={{ minWidth: 300 }}>
            Create
          </Button></>}

    </>
  );
}
