---
title: "ARIMA"
description: "Autoregressive Integrated Moving Average model for time series forecasting, including SARIMA for seasonal patterns."
date: 2026-03-28
categories: [Glossary]
tags: [ARIMA, time-series, forecasting, SARIMA, statistical-modeling]
related:
  - glossary/linear-regression
  - glossary/online-learning
  - guides/time-series-analysis-foundations
  - guides/time-series-forecasting
last_updated: 2026-05-30
---

ARIMA (Autoregressive Integrated Moving Average) is a classical statistical model for time series forecasting. It combines three components: autoregression (using past values to predict future values), differencing (making the series stationary), and moving average (using past forecast errors). ARIMA remains a strong baseline for time series problems and outperforms complex models on many datasets, particularly when data is limited.

## Components

**AR (Autoregressive) - order p**: The prediction is a linear combination of the previous p values. AR(1) uses only the last value, AR(2) uses the last two, and so on. The autocorrelation function (ACF) and partial autocorrelation function (PACF) help determine the appropriate order.

**I (Integrated) - order d**: Differencing removes trends to achieve stationarity. First-order differencing (d=1) subtracts each value from the previous one, removing linear trends. Second-order differencing (d=2) removes quadratic trends. Most real-world series need d=0, 1, or 2. The Augmented Dickey-Fuller test checks whether differencing is needed.

**MA (Moving Average) - order q**: The prediction includes a linear combination of the previous q forecast errors. This captures short-term shocks that affect future values. MA terms model how the series responds to random disturbances.

The full model is denoted ARIMA(p, d, q). For example, ARIMA(1, 1, 1) uses one autoregressive term, first-order differencing, and one moving average term.

## SARIMA - Seasonal Extension

SARIMA adds seasonal components for data with repeating patterns (monthly sales, weekly traffic). It is denoted ARIMA(p,d,q)(P,D,Q,m) where P, D, Q are seasonal AR, differencing, and MA orders, and m is the seasonal period (12 for monthly data, 7 for daily with weekly patterns).

Seasonal differencing (D=1) subtracts the value from the same period in the previous cycle. Combined with regular differencing, SARIMA handles both trend and seasonality.

## Model Selection

**Manual approach**: Examine ACF and PACF plots after differencing. AR terms show as significant PACF lags, MA terms as significant ACF lags. Seasonal terms appear at multiples of the seasonal period.

**Automatic approach**: The `auto_arima` function (from pmdarima in Python) searches over combinations of p, d, q (and seasonal terms) and selects the model that minimizes an information criterion (AIC or BIC). This is the practical default for most applications.

## Assumptions and Limitations

ARIMA requires stationarity (after differencing), assumes linear relationships between past and future values, and works best for short-to-medium-term forecasts. It handles univariate time series only - for multiple input variables, use ARIMAX or VAR models.

ARIMA struggles with long-range dependencies, complex non-linear patterns, and multiple seasonality (daily data with both weekly and yearly patterns). For these cases, consider Prophet, exponential smoothing methods, or deep learning approaches (LSTMs, Transformers).

## When to Use It

ARIMA is the right starting point for univariate time series forecasting. It works well for demand forecasting, financial time series, inventory planning, and any domain with trend and seasonal patterns. Always benchmark complex models against ARIMA - it frequently wins on small-to-medium datasets where sophisticated models overfit.

## Sources

- Box, G.E.P., & Jenkins, G.M. (1970). *Time Series Analysis: Forecasting and Control.* Holden-Day. (Original ARIMA formulation; the model is sometimes called Box-Jenkins.)
- Box, G.E.P., Jenkins, G.M., Reinsel, G.C., & Ljung, G.M. (2015). *Time Series Analysis: Forecasting and Control*, 5th ed. Wiley.
- Hyndman, R.J., & Athanasopoulos, G. (2021). *Forecasting: Principles and Practice*, 3rd ed. OTexts. Available at otexts.com/fpp3. (Free online textbook; definitive modern treatment of ARIMA, SARIMA, and state space models.)
- Makridakis, S., Spiliotis, E., & Assimakopoulos, V. (2018). Statistical and machine learning forecasting methods: Concerns and ways forward. *PLOS ONE, 13*(3). (M4 competition results; ARIMA as competitive baseline.)
