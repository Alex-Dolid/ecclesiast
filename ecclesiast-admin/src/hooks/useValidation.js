// Core
import { ref, onMounted } from '@vue/composition-api';
// @Core Utils
import { useSnackbar, useStore } from '@core/utils';
// @Core Utils Validators
import {
  required, emailValidator, minLength, typeValidator, passwordValidator,
} from '@core/utils/validation';

export const useValidation = (fetchValidationSchemaName) => { // TODO дописати
  const { snackbar } = useSnackbar(); // TODO видалити звідси
  const { store } = useStore();
  const schema = ref(null);
  const rules = ref({});
  const isLoading = ref(false);

  const handleSchema = (schemaData) => {
    const newRules = {};

    if (!schemaData) return newRules;

    // eslint-disable-next-line no-unused-expressions
    schemaData?.required?.forEach((name) => newRules[name] = [required]);

    Object.entries(schemaData.properties).forEach(([prop, schemaObj]) => {
      if (!newRules[prop]) {
        newRules[prop] = [(value) => typeValidator(value, schemaObj.type)];
      }

      newRules[prop].push((value) => typeValidator(value, schemaObj.type));

      if (schemaObj.minLength) {
        newRules[prop].push((value) => minLength(value, schemaObj.minLength));
      }

      if (schemaObj.format) {
        if (schemaObj.format === 'email') {
          newRules[prop].push(emailValidator);
        }
        if (schemaObj.format === 'password') {
          newRules[prop].push(passwordValidator);
        }
      }
    });

    return newRules;
  };
  const fetch = async () => {
    try {
      isLoading.value = true;
      schema.value = await store.value.dispatch(fetchValidationSchemaName);
      const result = handleSchema(schema.value);
      console.log('result', result);
      rules.value = result;
    } catch (error) {
      console.log(error);
      snackbar.value(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetch);

  return {
    isLoading,

    schema,
    rules,

    fetch,
  };
};
