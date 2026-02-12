<template>
    <div class="contact">
        <Header2>Contact Us</Header2>

        <div class="contact__contet">
            <div>
                <div>John Murphy - Manager</div>
                <div>Phone: <a href="tel:123 45 67 89">123 45 67 89</a></div>
                <div>
                    E-mail: <a href="mailto:jkowalski@burgir.pl">jburphy@burgir.pl</a>
                </div>
            </div>

            <div>
                <div>Restaurant - table reservation</div>
                <div>Phone: <a href="tel:123 45 67 89">123 45 67 89</a></div>
            </div>

            <div>
                <div>ul. Majstra 1337A, 69-420 Mielno</div>
                <div>
                    E-mail: <a href="mailto:poczta@burgir.pl">mail@burgir.pl</a>
                </div>
            </div>
        </div>

        <div class="content__hours">
            <h3 class="hours__header">Open hours:</h3>

            <div>monday - closed</div>
            <div>tuesday, wednesday, thursday - 3pm-8pm</div>
            <div>friday - 3pm-11pm</div>
            <div>saturday - 12pm-12pm</div>
            <div>sunday - 12pm-12pm</div>
        </div>
    </div>
</template>

<script setup>
import Header2 from './Header2.vue'
</script>

<style scoped>
.contact__contet {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

@media only screen and (min-width: 768px) {
    .contact__contet {
        flex-direction: row;
        justify-content: space-evenly;
    }
}

.contact__contet a {
    color: #f59705;
    text-decoration: none;
}

/* .content__hours {} */

@media only screen and (min-width: 768px) {
    .content__hours {
        width: fit-content;
        margin: 20px auto 0;
    }
}

.hours__header {
    font-weight: bold;
    font-size: 16px;
    color: #f59705;
}
</style>