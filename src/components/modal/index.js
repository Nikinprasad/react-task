import * as React from "react";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { Box, Divider } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

export default function AppointmentDetail(open, setOpen) {
  return (
    <React.Fragment>
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
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                <Typography>Andrew Smith</Typography>
                <Typography level="body3">UI Designer</Typography>
              </Box>
            </Box>
            <Divider component="div" sx={{ my: 2 }} />
            <List sx={{ "--List-decorator-size": "48px" }}>
              <ListItem sx={{ alignItems: "flex-start" }}>
                <ListItemContent>
                  <Typography fontSize="sm">Senior designer</Typography>
                  <Typography level="body3">Dribbble</Typography>
                </ListItemContent>
                <Typography level="body2">2015-now</Typography>
              </ListItem>
            </List>
            <Button size="sm" variant="plain" sx={{ px: 1, mt: 1 }}>
              Expand
            </Button>
            <Divider component="div" sx={{ my: 2 }} />
            <Typography fontSize="sm">Skills tags:</Typography>
          </Sheet>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
