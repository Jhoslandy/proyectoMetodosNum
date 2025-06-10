
import numpy as np
import matplotlib.pyplot as plt

N0 = 1000
lmbda = 0.05
t0 = 0
tf = 20
h = 0.5

t = np.arange(t0, tf + h, h)
N = np.zeros_like(t)
N[0] = N0

for i in range(1, len(t)):
    k1 = -lmbda * N[i - 1]
    k2 = -lmbda * (N[i - 1] + h * k1 / 2)
    k3 = -lmbda * (N[i - 1] + h * k2 / 2)
    k4 = -lmbda * (N[i - 1] + h * k3)
    N[i] = N[i - 1] + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
    print(f"RK4 - t = {t[i]:.2f}, N = {N[i]:.6f}")

plt.plot(t, N, label="RK4", marker='s')
plt.title("Desintegración Radiactiva - Método de Runge-Kutta 4to Orden")
plt.xlabel("Tiempo (días)")
plt.ylabel("Cantidad de Sustancia (gramos)")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
