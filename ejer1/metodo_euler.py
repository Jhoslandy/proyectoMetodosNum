
import matplotlib.pyplot as plt

# Parámetros
P0 = 100
k = 0.1
t0 = 0
tf = 10
h = 1

# Método de Euler
t_values = [t0]
P_values = [P0]

t = t0
P = P0

print("Iteración\tt\tP(t)")
i = 0
while t < tf:
    P = P + h * k * P
    t = t + h
    t_values.append(t)
    P_values.append(P)
    i += 1
    print(f"{i}\t\t{t:.2f}\t{P:.4f}")

# Gráfica
plt.plot(t_values, P_values, marker='o', label='Euler')
plt.title('Crecimiento Poblacional - Método de Euler')
plt.xlabel('Tiempo (años)')
plt.ylabel('Población')
plt.grid(True)
plt.legend()
plt.show()
