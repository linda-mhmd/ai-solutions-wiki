---
title: "Time Series Analysis Foundations"
description: "Comprehensive guide to time series forecasting methods including ARIMA, SARIMA, Prophet, seasonal decomposition, and practical implementation strategies."
date: 2026-03-28
categories: [Guides]
tags: [time-series, ARIMA, SARIMA, Prophet, forecasting, decomposition]
related:
  - glossary/arima
  - glossary/linear-regression
  - glossary/online-learning
  - guides/time-series-forecasting
  - glossary/gradient-boosting
last_updated: 2026-05-30
---

Time series analysis deals with data collected over time where the order matters. Sales figures, stock prices, sensor readings, website traffic, and energy consumption are all time series. Understanding their structure and choosing the right forecasting method is fundamental to many business and engineering problems. This guide covers the core concepts and practical methods.

## Understanding Time Series Components

Every time series can be decomposed into constituent components:

**Trend** is the long-term increase or decrease. Revenue growing 10% year-over-year, or a city's population gradually declining, are trends. Trends can be linear, exponential, or follow other functional forms.

**Seasonality** is a repeating pattern at a fixed frequency. Retail sales spike in December, ice cream sales peak in summer, and website traffic drops on weekends. Seasonality has a known, fixed period (7 days, 12 months, 24 hours).

**Cyclical patterns** resemble seasonality but have variable, often longer periods. Economic business cycles, real estate markets, and fashion trends are cyclical. Unlike seasonality, the period is not fixed and cycles are harder to predict.

**Residuals (noise)** are what remains after removing trend, seasonality, and cycles. Ideally, residuals are random with no discernible pattern. Structure in residuals indicates the model has not captured all the signal.

## Decomposition

**Additive decomposition** assumes `Y(t) = Trend(t) + Seasonal(t) + Residual(t)`. Use when seasonal fluctuations are constant regardless of the trend level.

**Multiplicative decomposition** assumes `Y(t) = Trend(t) * Seasonal(t) * Residual(t)`. Use when seasonal fluctuations scale with the trend - for example, December sales are always 30% higher than average, regardless of overall sales level.

**STL (Seasonal and Trend decomposition using Loess)** is a robust decomposition method that handles outliers, allows the seasonal component to change over time, and works with any seasonal period. It is the recommended approach in most cases.

```python
from statsmodels.tsa.seasonal import STL
result = STL(series, period=12).fit()
result.plot()
```

## Stationarity

Most classical time series methods require stationarity - the statistical properties (mean, variance, autocorrelation) do not change over time. A trending series is not stationary because its mean changes.

**Testing for stationarity** - The Augmented Dickey-Fuller (ADF) test and KPSS test check for stationarity. ADF tests the null hypothesis of a unit root (non-stationarity); a p-value below 0.05 suggests stationarity. KPSS tests the null hypothesis of stationarity. Use both for confirmation.

**Achieving stationarity** - Differencing (subtracting consecutive values) removes trends. Seasonal differencing (subtracting the value from the same season in the previous period) removes seasonality. Log transformation stabilizes variance. Most series become stationary after one or two rounds of differencing.

## ARIMA and SARIMA

ARIMA(p,d,q) combines autoregression (p past values), differencing (d times), and moving average (q past errors). SARIMA adds seasonal terms: ARIMA(p,d,q)(P,D,Q,m) where m is the seasonal period.

**Practical approach** - Use `pmdarima.auto_arima` to automatically search for the best (p,d,q)(P,D,Q,m) combination:

```python
from pmdarima import auto_arima
model = auto_arima(train, seasonal=True, m=12,
                   stepwise=True, suppress_warnings=True)
forecast = model.predict(n_periods=12)
```

ARIMA works well for short-to-medium-term forecasts on univariate series with clear trend and seasonal patterns. It struggles with long-range dependencies, multiple seasonalities, and non-linear patterns.

## Exponential Smoothing

Exponential smoothing methods weight recent observations more heavily than older ones, with the weights decaying exponentially.

**Simple Exponential Smoothing** handles series with no trend or seasonality. **Holt's method** adds trend handling. **Holt-Winters** handles both trend and seasonality, with additive and multiplicative variants.

ETS (Error, Trend, Seasonal) is the state-space formulation that encompasses all exponential smoothing variants and provides prediction intervals. It often performs comparably to ARIMA and is faster to fit.

```python
from statsmodels.tsa.holtwinters import ExponentialSmoothing
model = ExponentialSmoothing(train, trend='add', seasonal='mul', seasonal_periods=12).fit()
```

## Prophet

Prophet, developed by Meta, is designed for business time series with strong seasonal effects and several seasons of historical data. It decomposes the series into trend, seasonality, and holidays using an additive model.

**Key strengths**: Handles missing data and outliers gracefully, incorporates known holidays and events, allows analysts to add domain knowledge (capacity limits, change points), and produces interpretable components. It works well with daily data that has weekly and yearly seasonality.

```python
from prophet import Prophet
model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
model.add_country_holidays(country_name='US')
model.fit(df)  # DataFrame with 'ds' and 'y' columns
forecast = model.predict(future_df)
```

**Limitations**: Prophet can underperform on short series, high-frequency data (sub-daily), and series without clear seasonality. It is being superseded in some applications by more modern approaches.

## Machine Learning Approaches

Tree-based models (LightGBM, XGBoost) can be effective for time series when properly set up with lag features, rolling statistics, and calendar features. They handle multiple input features naturally (unlike ARIMA) and can capture non-linear relationships.

**Feature engineering for time series ML**: Create lag features (value at t-1, t-7, t-14), rolling means and standard deviations (7-day, 30-day windows), calendar features (day of week, month, holiday flags), and domain-specific features (promotion periods, weather).

**Critical caveat**: Use time-based splits for validation, never random splits. The training set must always precede the validation set chronologically. Use expanding window or sliding window cross-validation.

## Evaluation

**Train-test split** must respect time ordering. The test set is always the most recent portion of the data. Never shuffle time series data.

**Metrics**: MAPE (Mean Absolute Percentage Error) is intuitive but undefined when actual values are zero. RMSE penalizes large errors. MAE treats all errors equally. MASE (Mean Absolute Scaled Error) compares forecast accuracy against a naive baseline and is the recommended metric for comparing across series.

**Naive baselines** - Always compare against simple baselines: last observed value (persistence), seasonal naive (same value from the same season last year), and simple moving average. Any forecasting model that cannot beat these baselines is not providing value.

## Choosing a Method

For univariate series with clear trend and seasonality: Start with ARIMA/SARIMA or ETS. Use Prophet if you have daily data with holidays.

For multivariate problems (multiple input features): Use LightGBM with lag features and rolling statistics.

For multiple related series: Consider hierarchical forecasting (reconciliation across levels) or global models that learn across all series simultaneously.

For all cases: Start with simple baselines, add complexity only when it demonstrably improves forecast accuracy on a time-ordered holdout set.
