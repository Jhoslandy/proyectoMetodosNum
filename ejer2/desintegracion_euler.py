
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
    N[i] = N[i - 1] + h * (-lmbda * N[i - 1])
    print(f"Euler - t = {t[i]:.2f}, N = {N[i]:.6f}")

plt.plot(t, N, label="Euler", marker='o')
plt.title("Desintegración Radiactiva - Método de Euler")
plt.xlabel("Tiempo (días)")
plt.ylabel("Cantidad de Sustancia (gramos)")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
