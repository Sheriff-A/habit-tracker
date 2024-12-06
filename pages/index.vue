<template>
  <div>
    <h1 class="text-center">LOGO</h1>

    <Card class="mt-4">
      <template #title> Welcome to the app </template>
      <template #subtitle>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam,
        accusamus
      </template>
      <template #content>
        <FloatLabel variant="in">
          <InputText
            id="username"
            v-model="username"
            variant="filled"
            class="w-full"
          />
          <label for="username">Username</label>
        </FloatLabel>
        <FloatLabel variant="in" class="mt-4">
          <Password
            id="password"
            v-model="password"
            variant="filled"
            class="w-full"
            toggle-mask
            :feedback="false"
          />
          <label for="password">Password</label>
        </FloatLabel>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-2">
          <Button label="Sign In" class="w-full" @click="showOtpConfirm" />
        </div>
      </template>
    </Card>

    <ConfirmDialog>
      <template #message="slotProps">
        <div>
          <p>{{ slotProps.message.message }}</p>
          <InputOtp
            v-model="otp"
            class="mt-2 w-full"
            :length="6"
            integer-only
          />
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const router = useRouter();

const confirm = useConfirm();
const toast = useToast();

// TODO: Try PrimeVue Forms with Zod validation
const username = ref("");
const password = ref("");
const otp = ref();

function showOtpConfirm() {
  confirm.require({
    header: "OTP Verification",
    message: "Please enter the OTP sent to your email",
    acceptClass: "w-full",
    rejectClass: "w-full",
    acceptProps: {
      label: "Submit",
    },
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    accept: () => {
      // TODO: Add OTP verification logic
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "OTP verified. Welcome!",
        life: 3000,
      });
      router.push({
        name: "dashboard",
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "OTP Rejected",
        life: 3000,
      });
    },
  });
}
</script>
