import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: '10px auto',
  },
  select: {
    width: '100%',
  },
});

const Reporte = ({ reporte, onUpdate, onDelete }) => {
  const classes = useStyles();
  const [titulo, setTitulo] = useState(reporte.titulo);
  const [descripcion, setDescripcion] = useState(reporte.descripcion);
  const [estado, setEstado] = useState(reporte.estado);

  const handleUpdate = () => {
    onUpdate({ ...reporte, titulo, descripcion, estado });
  };

  const handleDelete = () => {
    onDelete(reporte.id);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">{titulo}</Typography>
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          label="Descripción"
          multiline
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Select
          label="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className={classes.select}
        >
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="en_progreso">En progreso</MenuItem>
          <MenuItem value="resuelto">Resuelto</MenuItem>
        </Select>
        <br />
        <Button variant="outlined" onClick={handleUpdate}>
          Actualizar
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Reporte;
