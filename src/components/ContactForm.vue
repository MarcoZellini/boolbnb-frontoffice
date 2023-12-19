<script>

import axios from 'axios';
import { store } from '../store';

export default {
    name: 'ContactForm',
    data() {
        return {
            store,
            errors: [],
            message: '',
            messagePayload: {
                apartment_id: '',
                name: '',
                lastname: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            },
            loading: false,
        }
    },
    methods: {
        sendMessage() {
            this.loading = true
            axios.request({
                baseURL: store.baseUrl,
                url: 'api/contacts',
                method: 'POST',
                data: {
                    message: this.messagePayload
                }
            })
                .then(response => {
                    this.message = '';
                    this.errors = [];

                    if (response.data.success) {
                        this.message = 'Messaggio inviato con successo';
                        this.messagePayload = {
                            apartment_id: '',
                            name: '',
                            lastname: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: ''
                        }
                        this.loading = false
                        console.log(this.loading);
                    } else {
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.messagePayload.apartment_id = this.$route.params.id;
    }
}
</script>

<template>
    <!-- form contatto -->
    <div class="col">
        <h3>Compila il form per metterti in contatto con il proprietario!</h3>
        <form action="#" method="POST" @submit.prevent="this.sendMessage" @keyup.enter.prevent="this.sendMessage">
            <div class="row my-3">
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.name" type="text" class="form-control" name="name" id="name"
                            placeholder="" required />
                        <label for="name" class="text-capitalize">Nome</label>
                        <small v-if="this.errors.name" v-for="error in this.errors.name"
                            class="form-text text-danger d-block text-end">
                            {{ error }}
                        </small>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.lastname" type="text" class="form-control" name="lastname"
                            id="lastname" placeholder="" required />
                        <label for="lastname" class="text-capitalize">Cognome</label>
                        <small v-if="this.errors.lastname" v-for="error in this.errors.lastname"
                            class="form-text text-danger d-block text-end">
                            {{ error }}
                        </small>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.email" type="email" class="form-control" name="email" id="email"
                            placeholder="" required />
                        <label for="email" class="text-capitalize">E-mail</label>
                        <small v-if="this.errors.email" v-for="error in this.errors.email"
                            class="form-text text-danger d-block text-end ms-auto">
                            {{ error }}
                        </small>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.phone" type="tel" class="form-control" name="phone" id="phone"
                            placeholder="" required />
                        <label for="phone" class="text-capitalize">Telefono</label>
                        <small v-if="this.errors.phone" v-for="error in this.errors.phone"
                            class="form-text text-danger d-block text-end ms-auto">
                            {{ error }}
                        </small>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.subject" type="text" class="form-control" name="subject"
                            id="subject" placeholder="" required />
                        <label for="subject" class="text-capitalize">Oggetto</label>
                        <small v-if="this.errors.subject" v-for="error in this.errors.subject"
                            class="form-text text-danger d-block text-end ms-auto">
                            {{ error }}
                        </small>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <div class="form-floating">
                            <textarea v-model="this.messagePayload.message" class="form-control"
                                placeholder="Leave a comment here" id="message" name="message" style="height: 100px"
                                required></textarea>
                            <label for="message">Messaggio</label>
                            <small v-if="this.errors.message" v-for="error in this.errors.message"
                                class="form-text text-danger d-block text-end ms-auto">
                                {{ error }}
                            </small>
                        </div>
                    </div>
                </div>

            </div>

            <div class="d-flex align-items-center">

                <button type="submit" class="d-flex align-items-center btn btn-bnb rounded-pill text-capitalize px-4 me-3">
                    <span v-if="this.loading">Sto inviando il messaggio... <font-awesome-icon :icon="['fas', 'paper-plane']" fade /></span>
                    <span v-else>Invia<font-awesome-icon :icon="['fas', 'paper-plane']" class="ms-2" /></span>
                </button>
                <span v-if="this.message" class="text-success">
                    <font-awesome-icon :icon="['fas', 'check']" class="me-1" />
                    {{ this.message }}</span>
            </div>
        </form>
    </div>
</template>

<style lang="scss"></style>