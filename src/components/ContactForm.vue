<script>

import axios from 'axios';
import { store } from '../store';

export default {
    name: 'ContactForm',
    data() {
        return {
            store,
            messagePayload: {
                apartment_id: '',
                name: '',
                lastname: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            }
        }
    },
    methods: {
        sendMessage() {

            axios.request({
                baseURL: store.baseUrl,
                url: 'api/contacts',
                method: 'POST',
                data: {
                    message: this.messagePayload
                }
            })
                .then(response => {
                    console.log(response);
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
            <div class="row">
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.name" type="text" class="form-control" name="name" id="name"
                            placeholder="" />
                        <label for="name" class="text-capitalize">Nome</label>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.lastname" type="text" class="form-control" name="lastname"
                            id="lastname" placeholder="" />
                        <label for="lastname" class="text-capitalize">Cognome</label>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.email" type="text" class="form-control" name="email" id="email"
                            placeholder="" />
                        <label for="email" class="text-capitalize">E-mail</label>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.phone" type="text" class="form-control" name="phone" id="phone"
                            placeholder="" />
                        <label for="phone" class="text-capitalize">Telefono</label>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <input v-model="this.messagePayload.subject" type="text" class="form-control" name="subject"
                            id="subject" placeholder="" />
                        <label for="subject" class="text-capitalize">Oggetto</label>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <div class="form-floating">
                            <textarea v-model="this.messagePayload.message" class="form-control"
                                placeholder="Leave a comment here" id="message" style="height: 100px"></textarea>
                            <label for="message">Messaggio</label>
                        </div>
                    </div>
                </div>

            </div>
            <button type="submit" class="d-flex align-items-center btn btn-bnb rounded-pill mt-2 text-capitalize px-4">
                Invia<font-awesome-icon :icon="['fas', 'paper-plane']" class="ms-2" />
            </button>
        </form>
    </div>
</template>

<style lang="scss"></style>