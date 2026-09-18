export const progressExamples = {
  colors: '<AppProgress :value="72" label="Progreso principal" />\n<AppProgress :value="54" label="Progreso exitoso" color="success" />\n<AppProgress :value="30" label="Progreso con riesgo" color="danger" />',
  styles: '<AppProgress :value="68" label="Carga" striped animated show-value />\n<AppProgress label="Procesando" indeterminate />',
  circular: '<AppProgress type="circular" :value="74" label="Uso completado" size="lg" show-value />',
  interactive: '<AppProgress :value="value" :color="color" :size="size" :type="type" :striped="striped" :animated="animated" :show-value="showValue" :indeterminate="indeterminate" label="Vista previa" />',
} as const
