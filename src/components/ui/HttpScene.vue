<script setup lang="ts">
defineProps<{ scene: string }>()
const nodes = [[45,100],[140,45],[240,110],[345,40],[470,105],[560,55],[90,245],[205,210],[335,235],[455,205],[565,260],[40,385],[165,365],[285,410],[410,360],[545,415]]
</script>
<template>
<svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <template v-if="scene === 'landscape'">
    <circle cx="444" cy="91" r="47" fill="#ffdc8e"/>
    <path d="M28 129c0-20 26-28 40-17 8-36 61-36 70 0 27-9 45 8 45 25H28Z M376 179c0-18 20-28 35-17 12-40 65-37 72 0 23-5 39 6 41 23H376Z" fill="white" opacity=".85"/>
    <!-- Closed, organic contours leave breathing room on every side of the scene. -->
    <path d="M38 358C64 326 99 220 135 171C167 192 227 307 282 350C329 310 373 227 411 190C451 219 493 309 543 341C563 354 568 376 549 387C438 425 166 425 57 389C37 382 28 372 38 358Z" fill="#a6d8cb"/>
    <path d="m94 232 41-61 52 65-38-14-17 15-17-18Z M378 241l33-51 43 67-34-17-18 11Z" fill="#f4fbf5"/>
    <path d="M31 375C75 342 126 323 183 342C236 361 246 386 280 379C373 351 412 304 482 323C529 336 572 363 570 384C566 416 472 439 356 441C227 450 88 428 44 407C26 399 18 387 31 375Z" fill="#65a992"/>
    <path d="M45 402C99 400 148 370 215 375C285 377 336 413 402 400C470 388 529 369 559 383C579 399 535 429 478 440C361 462 182 456 97 436C67 429 46 419 45 402Z" fill="#2f7868"/>
    <path d="M286 449C257 435 263 420 310 407C352 396 410 391 414 376C418 366 404 357 402 350C401 346 404 344 407 345C416 353 431 363 431 377C432 402 372 411 333 424C312 431 310 441 323 451Z" fill="#f6d3a1"/>
    <g fill="#8ac0a0" opacity=".8"><ellipse cx="113" cy="404" rx="9" ry="3"/><ellipse cx="162" cy="425" rx="6" ry="2"/><ellipse cx="463" cy="416" rx="8" ry="3"/><ellipse cx="493" cy="391" rx="5" ry="2"/></g>
    <g stroke="#356653" stroke-width="5" stroke-linecap="round"><path d="M476 280v79m-22-43 22-36 22 36m-40 15 18-29 18 29M89 310v65m-19-34 19-31 19 31"/></g>
    <path d="M341 259v140" stroke="#855f43" stroke-width="7"/><path d="m302 268 70-7 18 15-15 17-72 5Z" fill="#fff4d7"/><path d="m330 299-51 4-15 17 18 12 49-4Z" fill="#f7b769"/>
    <g transform="translate(199 294)"><path d="m21 72-7 60m31-60 12 60" stroke="#244756" stroke-width="13" stroke-linecap="round"/><rect x="6" y="23" width="50" height="59" rx="18" fill="#ef9657"/><rect x="-4" y="30" width="18" height="44" rx="8" fill="#326c76"/><circle cx="33" cy="9" r="17" fill="#f4c6a3"/><path d="M17 7c-6-29 39-31 34 0L38-1Z" fill="#694934"/><path d="m51 39 22 25 21-18" stroke="#ef9657" stroke-width="11" stroke-linecap="round"/><path d="m90 34 7 107" stroke="#855f43" stroke-width="5" stroke-linecap="round"/></g>
  </template>
  <template v-else-if="scene === 'door'">
    <g stroke="#a0b7df" stroke-width="1.5" opacity=".45"><path d="m45 100 95-55 100 65 105-70 125 65 90-50M90 245l115-35 130 25 120-30 110 55M40 385l125-20 120 45 125-50 135 55M45 100l45 145-50 140m100-340 65 165-40 155m75-255 95 125-50 175m60-370 110 165-45 155m60-255 95 155-20 155M45 100l160 110L345 40l-10 195 135-130M90 245l75 120 170-130 75 125 155-100"/></g>
    <circle v-for="(node, index) in nodes" :key="index" :cx="node[0]" :cy="node[1]" r="5" fill="#9bb6dd"/>
    <ellipse cx="308" cy="424" rx="145" ry="18" fill="#cdd9ee"/>
    <path d="M209 415V137a97 97 0 0 1 194 0v278Z" fill="#dce6f8" stroke="#91aad2" stroke-width="3"/>
    <path d="M230 414V142a76 76 0 0 1 152 0v272Z" fill="#7b97c4"/>
    <path d="m242 414 110 22V139c-29-27-77-14-110 3Z" fill="#f8fbff" stroke="#acbfdd" stroke-width="3"/>
    <circle cx="331" cy="291" r="6" fill="#d4a563"/>
    <rect x="355" y="242" width="101" height="88" rx="23" fill="#edb86b"/>
    <path d="M379 244v-23a27 27 0 0 1 54 0v23" stroke="#bc8741" stroke-width="11"/>
    <circle cx="406" cy="281" r="9" fill="#805e36"/><path d="M406 284v16" stroke="#805e36" stroke-width="7" stroke-linecap="round"/>
    <path d="M135 411v-69m0 30c-41-1-38-42-38-42 36-1 38 28 38 28m0 36c40 0 38-44 38-44-35 0-38 27-38 27" stroke="#659b92" stroke-width="8"/><path d="m110 402 8 28h35l8-28Z" fill="#86b5aa"/>
  </template>
  <template v-else>
    <circle cx="310" cy="234" r="168" fill="currentColor" opacity=".07"/>
    <circle cx="479" cy="102" r="18" fill="#edc38b"/><circle cx="114" cy="304" r="10" fill="#91b6b1"/>
    <path d="M87 173h25m-12-12v25m377 141h24m-12-12v24" stroke="currentColor" opacity=".3" stroke-width="3"/>
    <ellipse cx="309" cy="418" rx="162" ry="17" fill="currentColor" opacity=".09"/>
    <g v-if="scene === 'clock'">
      <path d="m221 365-21 44m189-44 21 44" stroke="#587f88" stroke-width="13" stroke-linecap="round"/>
      <circle cx="306" cy="243" r="137" fill="#fffaf0" stroke="#84b3b6" stroke-width="17"/>
      <circle cx="306" cy="243" r="112" stroke="#d9e6dd" stroke-width="2"/>
      <path d="M306 150v95l61 37" stroke="#4c6b76" stroke-width="12" stroke-linecap="round"/><circle cx="306" cy="243" r="11" fill="#e8af70"/>
      <path d="m213 110-32-30m217 30 32-30" stroke="#84b3b6" stroke-width="25" stroke-linecap="round"/>
      <path d="M290 51h32" stroke="#4c6b76" stroke-width="12" stroke-linecap="round"/>
    </g>
    <g v-else-if="scene === 'paper'">
      <rect x="181" y="89" width="254" height="315" rx="20" fill="#d4dfed" transform="rotate(8 308 247)"/>
      <rect x="159" y="69" width="254" height="325" rx="20" fill="#fffaf0" stroke="#acbbc9" stroke-width="3"/>
      <path d="M203 131h117M203 155h160" stroke="#bccbd5" stroke-width="8" stroke-linecap="round"/>
      <g stroke="#81aaa2" stroke-width="6" stroke-linecap="round"><path d="m204 209 9 9 18-20m-27 62 9 9 18-20"/><path d="M255 210h104m-104 51h77" stroke="#c5d4d9"/></g>
      <rect x="198" y="300" width="167" height="48" rx="10" fill="#fae6c7"/>
      <path d="m349 348 78-107 17 13-78 107-26 12Z" fill="#e9ad65"/><path d="m340 373 9-25 17 13Z" fill="#526775"/>
    </g>
    <g v-else-if="scene === 'connection'" stroke-linecap="round">
      <path d="M87 357c113 0 49-175 151-175m115 101c108 0 43 111 151 111" stroke="#81a6b9" stroke-width="15"/>
      <g transform="rotate(-25 300 236)"><path d="M178 195h82v81h-82a25 25 0 0 1-25-25v-31a25 25 0 0 1 25-25" fill="#86b9b1"/><path d="M260 212h29m-29 45h29" stroke="#587887" stroke-width="10"/><path d="M357 195h61a25 25 0 0 1 25 25v31a25 25 0 0 1-25 25h-61Z" fill="#e8b374"/></g>
      <path d="m307 123 5 26m46 11 22-18m-71 183-5 24" stroke="#dca662" stroke-width="6"/>
    </g>
    <g v-else>
      <rect x="168" y="131" width="269" height="191" rx="17" fill="#fffaf0" stroke="#9aaec2" stroke-width="5"/>
      <path d="M172 286h261" stroke="#9aaec2" stroke-width="4"/><path d="M303 324v45m-51 0h101" stroke="#9aaec2" stroke-width="12" stroke-linecap="round"/>
      <path d="m267 196-24 22 24 22m74-44 24 22-24 22" stroke="#94b4b3" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m295 244 16-52" stroke="#e2b075" stroke-width="8" stroke-linecap="round"/>
      <rect x="349" y="341" width="111" height="67" rx="12" fill="#e8b374"/><path d="M380 341v-16h48v16m-25 0v67" stroke="#b48650" stroke-width="5"/>
      <path d="m143 367 40-49" stroke="#6f9694" stroke-width="15" stroke-linecap="round"/><path d="M179 299a23 23 0 1 0 24 21l-18 2Z" fill="#6f9694"/>
    </g>
  </template>
</svg>
</template>
