
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

def euler_method():
    t_values = np.arange(t0, tf + h, h)
    T_values = np.zeros_like(t_values)
    T_values[0] = T0
    for i in range(steps):
        T_values[i + 1] = T_values[i] + h * (-k * (T_values[i] - Ta))
    return t_values, T_values

if __name__ == "__main__":
    t, T = euler_method()
    T_exact = np.array([exact_solution(tt) for tt in t])
    for i, tt in enumerate(t):
        print(f"Iter {i:02d} | t={tt:5.1f} | T_Euler={T[i]:8.4f} | Exacta={T_exact[i]:8.4f} | Error={abs(T_exact[i]-T[i]):.4f}")
    plt.figure()
    plt.plot(t, T, label='Euler')
    plt.plot(t, T_exact, linestyle="--", label='Exacta')
    plt.xlabel("Tiempo (min)")
    plt.ylabel("Temperatura (°C)")
    plt.title("Método de Euler - Enfriamiento de Newton")
    plt.legend()
    plt.grid(True)
    plt.show()
