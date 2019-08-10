# Stock Chart

This application plots the last 180 days of Bitcoin OHLC prices.

## Configuration

```yaml
---
kind: application
metadata:
  name: Stock Chart
  description: OHLCV daily data
spec:
  url: https://desktop-examples.github.io/stock-chart/
  window:
    autoHideMenuBar: true
    backgroundColor: "#1d1d26"
    title: Stock Chart
    titleBarStyle: hidden
```

## Quick Start

Install dependencies and start the application.

```bash
npm ci
npm start
```

## Building from source

To install all dependencies and build run:

```bash
git clone https://github.com/desktop-examples/stock-chart.git
cd core
npm ci
npm run build
```
