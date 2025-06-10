// --- Funciones auxiliares genéricas para las ecuaciones diferenciales ---

        // Función diferencial para el crecimiento poblacional: dP/dt = kP
        function f_population(t, P, k) {
            return k * P;
        }

        // Función diferencial para la desintegración radiactiva: dN/dt = -lambda * N
        function f_radioactive_decay(t, N, lmbda) {
            return -lmbda * N;
        }

        // Función diferencial para el enfriamiento de Newton: dT/dt = -k(T - Ta)
        function f_newton_cooling(t, T, Ta, k) {
            return -k * (T - Ta);
        }

        // --- Funciones de solución exacta ---
        // Función de solución exacta para el Enfriamiento de Newton
        function exact_solution_newton_cooling(t, T0, Ta, k) {
            return Ta + (T0 - Ta) * Math.exp(-k * t);
        }

        // --- Funciones del Método de Heun para cada problema ---

        // Función para calcular el crecimiento poblacional usando el Método de Heun
        function calculateHeunPopulation(P0, k, t0, tf, h) {
            let t = t0;
            let P = P0;
            let iterations = [];
            let i = 0;

            // Almacenar el valor inicial
            iterations.push({
                iteration: i,
                t: parseFloat(t.toFixed(2)),
                y: parseFloat(P.toFixed(4))
            });

            while (t < tf) {
                if (h <= 0) {
                    console.error("El tamaño de paso (h) debe ser mayor que cero para el cálculo.");
                    break;
                }

                let f_i = f_population(t, P, k);
                let P_pred = P + h * f_i;
                let f_ip1 = f_population(t + h, P_pred, k);
                
                P = P + h * 0.5 * (f_i + f_ip1);
                t = t + h;
                i++;

                iterations.push({
                    iteration: i,
                    t: parseFloat(t.toFixed(2)),
                    y: parseFloat(P.toFixed(4))
                });

                if (t >= tf) {
                    break;
                }
            }
            return iterations;
        }

        // Función para calcular la desintegración radiactiva usando el Método de Heun
        function calculateHeunRadioactiveDecay(N0, lmbda, t0, tf, h) {
            let t = t0;
            let N = N0;
            let iterations = [];
            let i = 0;

            // Almacenar el valor inicial
            iterations.push({
                iteration: i,
                t: parseFloat(t.toFixed(2)),
                y: parseFloat(N.toFixed(4))
            });

            while (t < tf) {
                if (h <= 0) {
                    console.error("El tamaño de paso (h) debe ser mayor que cero para el cálculo.");
                    break;
                }

                let k1 = f_radioactive_decay(t, N, lmbda);
                let N_pred = N + h * k1; // Prediction step
                let k2 = f_radioactive_decay(t + h, N_pred, lmbda); // Evaluation at predicted point

                N = N + (h / 2) * (k1 + k2); // Correction step
                t = t + h;
                i++;

                iterations.push({
                    iteration: i,
                    t: parseFloat(t.toFixed(2)),
                    y: parseFloat(N.toFixed(4))
                });

                if (t >= tf) {
                    break;
                }
            }
            return iterations;
        }

        // Función para calcular el Enfriamiento de Newton usando el Método de Heun
        function calculateHeunCooling(T0, Ta, k, t0, tf, h) {
            let t = t0;
            let T = T0;
            let iterations = [];
            let i = 0;

            // Almacenar el valor inicial
            let exact_T0 = exact_solution_newton_cooling(t, T0, Ta, k);
            iterations.push({
                iteration: i,
                t: parseFloat(t.toFixed(2)),
                T_Heun: parseFloat(T.toFixed(4)),
                T_Exact: parseFloat(exact_T0.toFixed(4)),
                Error: parseFloat(Math.abs(exact_T0 - T).toFixed(4))
            });

            while (t < tf) {
                if (h <= 0) {
                    console.error("El tamaño de paso (h) debe ser mayor que cero para el cálculo.");
                    break;
                }

                let f_i = f_newton_cooling(t, T, Ta, k); // Evaluate at current point
                let T_pred = T + h * f_i; // Predict T at t+h
                let f_ip1 = f_newton_cooling(t + h, T_pred, Ta, k); // Evaluate at predicted point

                T = T + h * 0.5 * (f_i + f_ip1); // Correct T
                t = t + h;
                i++;

                // Calcular valor exacto y error para el t actual
                let exact_T = exact_solution_newton_cooling(t, T0, Ta, k);

                iterations.push({
                    iteration: i,
                    t: parseFloat(t.toFixed(2)),
                    T_Heun: parseFloat(T.toFixed(4)),
                    T_Exact: parseFloat(exact_T.toFixed(4)),
                    Error: parseFloat(Math.abs(exact_T - T).toFixed(4))
                });

                if (t >= tf) {
                    break;
                }
            }
            return iterations;
        }

        // --- Función para mostrar los resultados en una tabla HTML (flexibilizada para diferentes encabezados y keys) ---
        function displayResultsTable(results, containerId, headers, dataKeys) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Contenedor con ID '${containerId}' no encontrado.`);
                return;
            }

            container.innerHTML = ''; // Limpiar contenido anterior

            if (results.length === 0) {
                container.innerHTML = '<p>No se generaron iteraciones. Verifique los parámetros de entrada.</p>';
                return;
            }

            // Crear la tabla
            const table = document.createElement('table');
            table.classList.add('results-table'); // Añadir clase para estilos

            // Crear el encabezado de la tabla
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Crear el cuerpo de la tabla
            const tbody = document.createElement('tbody');
            results.forEach(data => {
                const row = document.createElement('tr');
                dataKeys.forEach(key => { // Usar dataKeys para obtener los valores correspondientes
                    const cell = document.createElement('td');
                    cell.textContent = data[key];
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            container.appendChild(table);
        }

        // --- Event Listeners para los formularios ---

        document.addEventListener('DOMContentLoaded', () => {
            // Event Listener para el formulario del Ejemplo 1 (Crecimiento Poblacional)
            const populationForm = document.getElementById('populationForm');
            if (populationForm) {
                populationForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const P0 = parseFloat(document.getElementById('eq1_p0').value);
                    const k = parseFloat(document.getElementById('eq1_k').value);
                    const tf = parseFloat(document.getElementById('eq1_tf').value);
                    const h = parseFloat(document.getElementById('eq1_h').value);

                    if (isNaN(P0) || isNaN(k) || isNaN(tf) || isNaN(h)) {
                        alert('Por favor, ingrese valores numéricos válidos en todos los campos.');
                        return;
                    }
                    if (h <= 0) {
                        alert('El tamaño de paso (h) debe ser mayor que cero.');
                        return;
                    }
                    if (tf <= 0) {
                        alert('El tiempo final (tf) debe ser mayor que cero.');
                        return;
                    }
                    if (P0 < 0) {
                        alert('La población inicial (P0) no puede ser negativa.');
                        return;
                    }

                    const results = calculateHeunPopulation(P0, k, 0, tf, h);
                    displayResultsTable(results, 'populationResults', ['Iteración', 'Tiempo (t)', 'Población (P(t))'], ['iteration', 't', 'y']);
                });
            }

            // Event Listener para el formulario del Ejemplo 2 (Desintegración Radiactiva)
            const decayForm = document.getElementById('decayForm');
            if (decayForm) {
                decayForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const N0 = parseFloat(document.getElementById('eq2_n0').value);
                    const lmbda = parseFloat(document.getElementById('eq2_lambda').value);
                    const tf = parseFloat(document.getElementById('eq2_tf').value);
                    const h = parseFloat(document.getElementById('eq2_h').value);

                    if (isNaN(N0) || isNaN(lmbda) || isNaN(tf) || isNaN(h)) {
                        alert('Por favor, ingrese valores numéricos válidos en todos los campos.');
                        return;
                    }
                    if (h <= 0) {
                        alert('El tamaño de paso (h) debe ser mayor que cero.');
                        return;
                    }
                    if (tf <= 0) {
                        alert('El tiempo final (tf) debe ser mayor que cero.');
                        return;
                    }
                    if (N0 < 0) {
                        alert('La cantidad inicial (N0) no puede ser negativa.');
                        return;
                    }

                    const results = calculateHeunRadioactiveDecay(N0, lmbda, 0, tf, h);
                    displayResultsTable(results, 'decayResults', ['Iteración', 'Tiempo (t)', 'Cantidad (N(t))'], ['iteration', 't', 'y']);
                });
            }

            // Event Listener para el formulario del Ejemplo 3 (Enfriamiento de Newton)
            const coolingForm = document.getElementById('coolingForm');
            if (coolingForm) {
                coolingForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const T0 = parseFloat(document.getElementById('eq3_t0').value);
                    const Ta = parseFloat(document.getElementById('eq3_ta').value);
                    const k = parseFloat(document.getElementById('eq3_k').value);
                    const tf = parseFloat(document.getElementById('eq3_tf').value);
                    const h = parseFloat(document.getElementById('eq3_h').value);

                    if (isNaN(T0) || isNaN(Ta) || isNaN(k) || isNaN(tf) || isNaN(h)) {
                        alert('Por favor, ingrese valores numéricos válidos en todos los campos.');
                        return;
                    }
                    if (h <= 0) {
                        alert('El tamaño de paso (h) debe ser mayor que cero.');
                        return;
                    }
                    if (tf <= 0) {
                        alert('El tiempo final (tf) debe ser mayor que cero.');
                        return;
                    }

                    const results = calculateHeunCooling(T0, Ta, k, 0, tf, h);
                    displayResultsTable(results, 'coolingResults', ['Iteración', 'Tiempo (t)', 'Temperatura (T_Heun)', 'Exacta', 'Error'], ['iteration', 't', 'T_Heun', 'T_Exact', 'Error']);
                });
            }
        });