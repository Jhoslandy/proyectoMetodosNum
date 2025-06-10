
import matplotlib.pyplot as plt

# Parámetros
P0 = 100
k = 0.1
t0 = 0
tf = 10
h = 1

# Método de Heun
t_values = [t0]
P_values = [P0]

t = t0
P = P0

print("Iteración\tt\tP(t)")
i = 0
while t < tf:
    P_pred = P + h * k * P
    P = P + h * (k * P + k * P_pred) / 2
    t = t + h
    t_values.append(t)
    P_values.append(P)
    i += 1
    print(f"{i}\t\t{t:.2f}\t{P:.4f}")

# Gráfica
plt.plot(t_values, P_values, marker='o', label='Heun')
plt.title('Crecimiento Poblacional - Método de Heun')
plt.xlabel('Tiempo (años)')
plt.ylabel('Población')
plt.grid(True)
plt.legend()
plt.show()
