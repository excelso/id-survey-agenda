<?php

    use Webklex\PHPIMAP\IMAP;
    use Webklex\PHPIMAP\Support\Masks\AttachmentMask;
    use Webklex\PHPIMAP\Support\Masks\MessageMask;

    return [

        'default' => env('IMAP_DEFAULT_ACCOUNT', 'default'),

        'accounts' => [
            'default' => [// account identifier
                'host'  => env('IMAP_HOST', 'localhost'),
                'port'  => env('IMAP_PORT', 993),
                'protocol'  => env('IMAP_PROTOCOL', 'imap'), //might also use imap, [pop3 or nntp (untested)]
                'encryption'    => env('IMAP_ENCRYPTION', 'ssl'), // Supported: false, 'ssl', 'tls'
                'validate_cert' => env('IMAP_VALIDATE_CERT', true),
                'username' => env('IMAP_USERNAME', 'root@example.com'),
                'password' => env('IMAP_PASSWORD', ''),
            ],
            /*
            'gmail' => [ // account identifier
                'host' => 'imap.gmail.com',
                'port' => 993,
                'encryption' => 'ssl', // Supported: false, 'ssl', 'tls'
                'validate_cert' => true,
                'username' => 'example@gmail.com',
                'password' => 'PASSWORD',
            ],
            'another' => [ // account identifier
                'host' => '',
                'port' => 993,
                'encryption' => false, // Supported: false, 'ssl', 'tls'
                'validate_cert' => true,
                'username' => '',
                'password' => '',
            ]
            */
        ],

        'options' => [
            'delimiter' => '/',
            'fetch' => IMAP::FT_PEEK,
            'sequence' => IMAP::FT_UID,
            'fetch_body' => true,
            'fetch_attachment' => true,
            'fetch_flags' => true,
            'message_key' => 'id',
            'fetch_order' => 'desc',
            'open' => [
                // 'DISABLE_AUTHENTICATOR' => 'GSSAPI'
            ],
            'decoder' => [
                'message' => [
                    'subject' => 'utf-8' // mimeheader
                ],
                'attachment' => [
                    'name' => 'utf-8' // mimeheader
                ]
            ]
        ],

        'masks' => [
            'message' => MessageMask::class,
            'attachment' => AttachmentMask::class
        ]
    ];
