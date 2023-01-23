import * as React from "react";

import ListItem from "@mui/joy/ListItem";

import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { Visibility, Delete, Edit } from "@mui/icons-material";
import Tooltip from "@mui/joy/Tooltip";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import List from "@mui/joy/List";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { Box, Divider } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

import AppointmentDetail from "../modal";

import http from "../../services/httpService";
import { useNavigate } from "react-router-dom";

export const DividedList = ({ id, title, description, date }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState("");

  const handleOpen = () => {
    setOpen("Open");
  };

  const handleDelete = async () => {
    await http
      .delete("deleteAppointment/" + id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error:" + err);
      });
  };
  return (
    <>
      <ListItem sx={{ justifyContent: "center" }}>
        <Typography level="body1">{id}</Typography>
      </ListItem>
      <ListItem sx={{ justifyContent: "center" }}>
        <Typography level="body1">{title}</Typography>
      </ListItem>
      <ListItem sx={{ justifyContent: "center" }}>
        <Typography level="body1">{description}</Typography>
      </ListItem>
      <ListItem sx={{ justifyContent: "center" }}>
        <Typography level="body1">{date}</Typography>
      </ListItem>
      <ListItem
        sx={{
          justifyContent: "center",
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: "1fr 1fr 1fr",
          "& > *": {
            p: 2,
            "&:nth-of-type(n):not(:nth-last-of-type(-n+3))": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Tooltip title="View Appointment" variant="solid" color="primary">
          <IconButton variant="plain" onClick={handleOpen}>
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update Appointment" variant="solid" color="success">
          <IconButton variant="plain" color="success">
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Appointment" variant="solid" color="danger">
          <IconButton variant="plain" color="danger" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Modal open={!!open} onClose={() => setOpen("")}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={open || undefined}
        >
          <ModalClose />
          <Sheet
            component="li"
            variant="outlined"
            sx={{
              borderRadius: "sm",
              p: 2,
              listStyle: "none",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Box>
                <Typography level="h2">{id}</Typography>
              </Box>
            </Box>
            <Divider component="div" sx={{ my: 2 }} />
            <List sx={{ "--List-decorator-size": "48px" }}>
              <ListItem sx={{ alignItems: "f" }}>
                <ListItemContent>
                  <Typography level="h5">{title}</Typography>
                </ListItemContent>
                <Typography level="h5">{date}</Typography>
              </ListItem>
            </List>
            <Divider component="div" sx={{ my: 2 }} />
            <Typography level="h5" fontWeight={4}>
              Description:
            </Typography>
            <Typography level="body1"> {description}</Typography>
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
};
