import * as React from "react";

import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import http from "../../services/httpService";

import { isExpired } from "react-jwt";

export default function RegisterUser() {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [alert, setAlert] = React.useState({ color: "success", message: "Logged In successfully", icon: <CheckCircleIcon />, open: false })

    const [emailColor, setEmailColor] = React.useState("primary");

    React.useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) { }
        else {
            if (isExpired(user.token)) { }
            else { navigate(`/list/${user.id}`) }
        }
    }, []
    )

    const handleSubmit = async (event) => {
        event.preventDefault();
        await http
            .post("user/signup", {
                username,
                email,
                password,
            }).then(() => { setAlert({ color: "success", message: "Logged In successfully", icon: <CheckCircleIcon />, open: true }) })
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.error("Error:" + err);
            });
    };


    return (
        <>
            {alert.open ? <Alert
                sx={{ alignItems: 'flex-start' }}
                startDecorator={React.cloneElement(alert.icon, {
                    sx: { mt: '2px', mx: '4px' },
                    fontSize: 'xl2',
                })}
                variant="soft"
                color={alert.color}
                endDecorator={
                    <IconButton variant="soft" size="sm" color={alert.color} onClick={() => setAlert({ open: false })}>
                        <CloseRoundedIcon />
                    </IconButton>
                }
            > <div>
                    <Typography fontWeight="lg" mt={0.25}>
                        {alert.message}
                    </Typography>
                </div></Alert> : ""}
            <Typography level="h2" mb={5}>
                Register
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Input
                        placeholder="Username"
                        type="text"
                        value={username}
                        variant="outlined"
                        color="primary"
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        size="lg"
                        sx={{ mb: 1, minWidth: 400 }}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        variant="outlined"
                        color={emailColor}
                        onChange={(event) => { setEmail(event.target.value); event.target.value.length > 0 ? setEmailColor("primary") : setEmailColor("danger") }}
                        required
                        size="lg"
                        sx={{ mb: 1, minWidth: 400 }}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        variant="outlined"
                        color="primary"
                        sx={{ mb: 1, minWidth: 400 }}
                        size="lg"
                        type="password"
                    />

                    <Button type="submit" sx={{ minWidth: 300 }}>
                        Register
                    </Button>
                </Box>
            </form>
        </>
    );
}
