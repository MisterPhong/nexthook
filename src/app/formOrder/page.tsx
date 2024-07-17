'use client'
import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddOrderForm = () => {
  const [orderData, setOrderData] = useState({
    symbol: '',
    leverage: '',
    quantity: '',
    timeframe: '',
    ema: '',
    type: '',
  });

  const [errors, setErrors] = useState({
    symbol: false,
    leverage: false,
    quantity: false,
    timeframe: false,
    ema: false,
    type: false,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Validate form fields
    const newErrors = {
      symbol: orderData.symbol === '',
      leverage: orderData.leverage === '',
      quantity: orderData.quantity === '',
      timeframe: orderData.timeframe === '',
      ema: orderData.ema === '',
      type: orderData.type === '',
    };

    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some(error => error);

    if (!hasErrors) {
      // Handle form submission logic here, e.g., send data to server
      console.log('Submitting order:', orderData);
      // Reset form fields after submission (optional)
      setOrderData({
        symbol: '',
        leverage: '',
        quantity: '',
        timeframe: '',
        ema: '',
        type: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Symbol"
            name="symbol"
            value={orderData.symbol}
            onChange={handleChange}
            error={errors.symbol}
            helperText={errors.symbol ? 'Required' : ''}
            variant="outlined"
            style={{ backgroundColor: errors.symbol ? '#ffebee' : '' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Leverage"
            name="leverage"
            value={orderData.leverage}
            onChange={handleChange}
            error={errors.leverage}
            helperText={errors.leverage ? 'Required' : ''}
            variant="outlined"
            style={{ backgroundColor: errors.leverage ? '#ffebee' : '' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
            error={errors.quantity}
            helperText={errors.quantity ? 'Required' : ''}
            variant="outlined"
            style={{ backgroundColor: errors.quantity ? '#ffebee' : '' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Timeframe"
            name="timeframe"
            value={orderData.timeframe}
            onChange={handleChange}
            error={errors.timeframe}
            helperText={errors.timeframe ? 'Required' : ''}
            variant="outlined"
            style={{ backgroundColor: errors.timeframe ? '#ffebee' : '' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="EMA"
            name="ema"
            value={orderData.ema}
            onChange={handleChange}
            error={errors.ema}
            helperText={errors.ema ? 'Required' : ''}
            variant="outlined"
            style={{ backgroundColor: errors.ema ? '#ffebee' : '' }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={errors.type} variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={orderData.type}
              onChange={handleChange}
            >
              <MenuItem value="EMA">EMA</MenuItem>
              <MenuItem value="CDC">CDC</MenuItem>
              {/* Add more options as needed */}
            </Select>
            {errors.type && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>Required</p>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                {/* Header row */}
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Symbols
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Quantity
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    PNL
                    <br />
                    (ROI %)
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Timeframe
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Created at
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Type
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography variant="h6" component="div">
                    Close Position
                  </Typography>
                </Grid>

                {/* Divider row */}
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Data rows */}
                <Grid item xs={1.5} style={{ borderLeft: '4px solid red', paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary" component="div">
                    BTC/USDT
                    <div style={{ marginTop: '4px', backgroundColor: '#F6D93F', width: 30 }}>15x</div>
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    57,007
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    145.88 USDT
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    12123 USDT (12123)
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    5m
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    12/07/2024
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    EMA/20
                  </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ paddingLeft: '8px' }}>
                  <Typography variant="body2" color="text.secondary">
                    <DeleteIcon />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddOrderForm;
