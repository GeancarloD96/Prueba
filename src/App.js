import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import Reporte from './Reporte';
import { Pool } from 'pg';

const App = () => {
  const [reportes, setReportes] = useState([]);
  const pool = new Pool({
    user: 'postgres', // Reemplaza con el usuario de tu base de datos
    host: 'localhost', // Reemplaza con el host de tu base de datos
    database: 'inventario_reportes', // Reemplaza con el nombre de tu base de datos
    password: 'password', // Reemplaza con la contraseña de tu base de datos
    port: 5432, // Reemplaza con el puerto de tu base de datos
  });

  useEffect(() => {
    // Obtener los reportes de la base de datos
    pool.query('SELECT * FROM reportes', (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      setReportes(res.rows);
    });
  }, []);

  const handleAddReporte = () => {
    // Implementar la lógica para agregar un nuevo reporte a la base de datos
    const titulo = 'Nuevo reporte';
    const descripcion = 'Descripción del nuevo reporte';
    const estado = 'pendiente';
    pool.query(
      'INSERT INTO reportes (titulo, descripcion, estado) VALUES ($1, $2, $3)',
      [titulo, descripcion, estado],
      (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        // Actualizar la lista de reportes
        const newReportes = [...reportes, { id: res.rows[0].id, titulo, descripcion, estado }];
        setReportes(newReportes);
      }
    );
  };

  const handleUpdateReporte = (reporte) => {
    // Implementar la lógica para actualizar un reporte en la base de datos
    const { id, titulo, descripcion, estado } = reporte;
    pool.query(
      'UPDATE reportes SET titulo = $1, descripcion = $2, estado = $3 WHERE id = $4',
      [titulo, descripcion, estado, id],
      (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        // Actualizar el reporte en la lista
        const updatedReportes = [...reportes];
        const index = updatedReportes.findIndex((r) => r.id === id);
        updatedReportes[index] = reporte;
        setReportes(updatedReportes);
      }
    );
  };

  const handleDeleteReporte = (id) => {
    // Implementar la lógica para eliminar un reporte de la base de datos
    pool.query('DELETE FROM reportes WHERE id = $1', [id], (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      // Eliminar el reporte de la lista
      const filteredReportes = reportes.filter((r) => r.id !== id);
      setReportes(filteredReportes);
    });
  };

  return (
    <Container>
      <Typography variant="h3">Inventario de Reportes de Problemas</Typography>
      <Button variant="outlined" onClick={handleAddReporte}>
        Agregar Reporte
      </Button>
      {reportes.map((reporte) => (
        <Reporte
          key={reporte.id}
          reporte={reporte}
          onUpdate={handleUpdateReporte}
          onDelete={handleDeleteReporte}
        />
      ))}
    </Container>
  );
};

export default App;


     

