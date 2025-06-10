
import numpy as np
import matplotlib.pyplot as plt
import math

# Parámetros
T0 = 100.0
Ta = 20.0
k  = 0.07
t0 = 0.0
tf = 60.0
h  = 2.0
steps = int((tf - t0) / h)

def exact_solution(t):
    return Ta + (T0 - Ta) * math.exp(-k * t)

def rk4_method():
    t_values = np.arange(t0, tf + h, h)
    T_values = np.zeros_like(t_values)
    T_values[0] = T0
    for i in range(steps):
        t_i = t_values[i]
        Y_i = T_values[i]
        k1 = -k * (Y_i - Ta)
        k2 = -k * ((Y_i + 0.5 * h * k1) - Ta)
        k3 = -k * ((Y_i + 0.5 * h * k2) - Ta)
        k4 = -k * ((Y_i + h * k3) - Ta)
        T_values[i + 1] = Y_i + (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4)
    return t_values, T_values

if __name__ == "__main__":
    t, T = rk4_method()
    T_exact = np.array([exact_solution(tt) for tt in t])
    for i, tt in enumerate(t):
        print(f"Iter {i:02d} | t={tt:5.1f} | T_RK4={T[i]:8.4f} | Exacta={T_exact[i]:8.4f} | Error={abs(T_exact[i]-T[i]):.4f}")
    plt.figure()
    plt.plot(t, T, label='RK4')
    plt.plot(t, T_exact, linestyle="--", label='Exacta')
    plt.xlabel("Tiempo (min)")
    plt.ylabel("Temperatura (°C)")
    plt.title("Método RK4 - Enfriamiento de Newton")
    plt.legend()
    plt.grid(True)
    plt.show()
