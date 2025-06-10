
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

def heun_method():
    t_values = np.arange(t0, tf + h, h)
    T_values = np.zeros_like(t_values)
    T_values[0] = T0
    for i in range(steps):
        f_i = -k * (T_values[i] - Ta)
        T_pred = T_values[i] + h * f_i
        f_ip1 = -k * (T_pred - Ta)
        T_values[i + 1] = T_values[i] + h * 0.5 * (f_i + f_ip1)
    return t_values, T_values

if __name__ == "__main__":
    t, T = heun_method()
    T_exact = np.array([exact_solution(tt) for tt in t])
    for i, tt in enumerate(t):
        print(f"Iter {i:02d} | t={tt:5.1f} | T_Heun={T[i]:8.4f} | Exacta={T_exact[i]:8.4f} | Error={abs(T_exact[i]-T[i]):.4f}")
    plt.figure()
    plt.plot(t, T, label='Heun')
    plt.plot(t, T_exact, linestyle="--", label='Exacta')
    plt.xlabel("Tiempo (min)")
    plt.ylabel("Temperatura (°C)")
    plt.title("Método de Heun - Enfriamiento de Newton")
    plt.legend()
    plt.grid(True)
    plt.show()
