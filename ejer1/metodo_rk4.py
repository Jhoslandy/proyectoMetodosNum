
import matplotlib.pyplot as plt

# Parámetros
P0 = 100
k = 0.1
t0 = 0
tf = 10
h = 1

# Método de Runge-Kutta 4to orden
t_values = [t0]
P_values = [P0]

t = t0
P = P0

print("Iteración\tt\tP(t)")
i = 0
while t < tf:
    k1 = k * P
    k2 = k * (P + 0.5 * h * k1)
    k3 = k * (P + 0.5 * h * k2)
    k4 = k * (P + h * k3)
    P = P + (h / 6) * (k1 + 2*k2 + 2*k3 + k4)
    t = t + h
    t_values.append(t)
    P_values.append(P)
    i += 1
    print(f"{i}\t\t{t:.2f}\t{P:.4f}")

# Gráfica
plt.plot(t_values, P_values, marker='o', label='Runge-Kutta 4')
plt.title('Crecimiento Poblacional - Método de Runge-Kutta 4to Orden')
plt.xlabel('Tiempo (años)')
plt.ylabel('Población')
plt.grid(True)
plt.legend()
plt.show()
