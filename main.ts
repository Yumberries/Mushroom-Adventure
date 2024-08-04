namespace SpriteKind {
    export const Target = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Is_Jumping == false && Is_Double_Jumping == false && mySprite.isHittingTile(CollisionDirection.Top) == false) {
        mySprite.vy = 0
        mySprite.vy += -150
        Is_Jumping = true
        RightLeft_image_check()
        Shooting_Direction = 2
    } else if (Is_Jumping == true && Is_Double_Jumping == false && mySprite.isHittingTile(CollisionDirection.Top) == false) {
        mySprite.vy = 0
        mySprite.vy += -150
        Is_Double_Jumping = true
        RightLeft_image_check()
        Shooting_Direction = 2
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("Shoot", 250, function () {
        Shoot_Mushroom()
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Target, function (sprite, otherSprite) {
    otherSprite.setImage(img`
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        `)
})
function Shoot_Mushroom () {
    if (Shooting_Direction == 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . 2 2 . . . . . . . 
            . . 2 2 2 2 . . . . . . 
            . 2 2 2 1 2 2 . . . . . 
            . 2 2 2 2 2 2 d d d d . 
            2 2 2 2 2 2 2 d f d d d 
            2 1 2 2 2 2 2 d d d d . 
            2 2 2 2 2 1 2 d f d d . 
            2 2 2 2 2 2 2 d d d d d 
            . 2 2 2 2 2 2 d d d d . 
            . 2 1 2 2 2 2 . . . . . 
            . . 2 2 2 2 . . . . . . 
            . . . 2 2 . . . . . . . 
            `, mySprite, -200, 0)
        projectile.setPosition(mySprite.x, mySprite.y - 5)
    } else if (Shooting_Direction == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . 2 2 . . . 
            . . . . . . 2 2 2 2 . . 
            . . . . . 2 2 1 2 2 2 . 
            . d d d d 2 2 2 2 2 2 . 
            d d d f d 2 2 2 2 2 2 2 
            . d d d d 2 2 2 2 2 1 2 
            . d d f d 2 1 2 2 2 2 2 
            d d d d d 2 2 2 2 2 2 2 
            . d d d d 2 2 2 2 2 2 . 
            . . . . . 2 2 2 2 1 2 . 
            . . . . . . 2 2 2 2 . . 
            . . . . . . . 2 2 . . . 
            `, mySprite, 200, 0)
        projectile.setPosition(mySprite.x, mySprite.y - 5)
    } else if (Shooting_Direction == 2) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . 2 2 2 2 . . . . 
            . . 2 2 2 1 2 2 2 2 . . 
            . 2 2 2 2 2 2 2 2 1 2 . 
            2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 1 2 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 1 2 2 2 2 . 
            . . 2 2 2 2 2 2 2 2 . . 
            . . . d d d d d d . . . 
            . . . d f d f d d . . . 
            . . . d d d d d d . . . 
            . . . d d d d d d . . . 
            . . . . d . . d . . . . 
            `, mySprite, 0, -200)
        projectile.setPosition(mySprite.x, mySprite.y - 5)
    }
}
function RightLeft_image_check () {
    if (Facing_Right == false) {
        mySprite.setImage(img`
            ...........22222222...........
            .......2111122222222222.......
            .....2221111222222222222211...
            ....222221122222222222222211..
            .1222222222222222222222222222.
            111222222222222222112222222222
            111222222222222221111222222222
            112222222222222221111222222222
            222222222222222222112222222222
            222222222222222222222222222222
            222222222222222222222222211222
            222222222222112222222222111122
            222222222221111222222222111122
            222222222221111222222222211222
            222222222222112222222222222222
            ..21111222222222222222222222..
            ....1112222222222222211222cc..
            c.....ddddddddddddddddddccccc.
            cc....ddddddddddddddddddbcccc.
            ccc...ddd1fdddd1fdddddddcbbbb.
            .ccc..dddffddddffdddddddccccc.
            ..cccbdddffddddffddddbddccccc.
            ...cbdddddddddddddbddbddbcccc.
            ...cbddddddddddddddbbdddcbbbb.
            .....bddddddddddddddddddccccc.
            ......dddddddddddddddddd.ccc..
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)
    } else if (Facing_Right == true) {
        mySprite.setImage(img`
            ...........22222222...........
            .......2222222222211112.......
            ...112222222222222111122222...
            ..11222222222222222112222222..
            .2222222222222222222222222221.
            222222222211222222222222222111
            222222222111122222222222222111
            222222222111122222222222222211
            222222222211222222222222222222
            222222222222222222222222222222
            222112222222222222222222222222
            221111222222222211222222222222
            221111222222222111122222222222
            222112222222222111122222222222
            222222222222222211222222222222
            ..22222222222222222222211112..
            ..cc2221122222222222222111....
            .cccccdddddddddddddddddd.....c
            .ccccbdddddddddddddddddd....cc
            .bbbbcdddddddf1ddddf1ddd...ccc
            .cccccdddddddffddddffddd..ccc.
            .cccccddbddddffddddffdddbccc..
            .ccccbddbddbdddddddddddddbc...
            .bbbbcdddbbddddddddddddddbc...
            .cccccddddddddddddddddddb.....
            ..ccc.dddddddddddddddddd......
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)
    }
}
let Facing_Right = false
let projectile: Sprite = null
let Shooting_Direction = 0
let Is_Double_Jumping = false
let Is_Jumping = false
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`Character`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
tiles.setCurrentTilemap(tilemap`Learning_Area`)
scene.cameraFollowSprite(mySprite)
mySprite.ay = 350
Is_Jumping = false
Is_Double_Jumping = false
tiles.placeOnRandomTile(mySprite, assets.tile`myTile23`)
Shooting_Direction = 1
mySprite.setScale(1, ScaleAnchor.Middle)
tileUtil.createSpritesOnTiles(assets.tile`myTile11`, img`
    . . . . . d d d d d d . . . . . 
    . . . d d e e e e e e d d . . . 
    . . d e e d d d d d d e e d . . 
    . d e d d d e e e e d d d e d . 
    . d e d e e d d d d e e d e d . 
    d e d d e d d e e d d e d d e d 
    d e d e d d e d d e d d e d e d 
    d e d e d e d 2 2 d e d e d e d 
    d e d e d e d 2 2 d e d e d e d 
    d e d e d d e d d e d d e d e d 
    d e d d e d d e e d d e d d e d 
    . d e d e e d d d d e e d e d . 
    . d e d d d e e e e d d d e d . 
    . . d e e d d d d d d e e d . . 
    . . . d d e e e e e e d d . . . 
    . . . . . d d d d d d . . . . . 
    `, SpriteKind.Target)
game.onUpdate(function () {
    if (mySprite.image.equals(img`
        ...........22222222...........
        .....2221111222222222222211...
        ....222221122222222222222211..
        .1222222222222222222222222222.
        111222222222222222112222222222
        111222222222222221111222222222
        112222222222222221111222222222
        222222222222222222112222222222
        222222222222222222222222222222
        222222222222222222222222211222
        222222222222112222222222111122
        222222222221111222222222111122
        222222222221111222222222211222
        222222222222112222222222222222
        ..21111222222222222222222222..
        ....1112222222222222211222....
        `)) {
        mySprite.setVelocity(-150, 60)
    } else if (mySprite.image.equals(img`
        ...........22222222...........
        ...112222222222222111122222...
        ..11222222222222222112222222..
        .2222222222222222222222222221.
        222222222211222222222222222111
        222222222111122222222222222111
        222222222111122222222222222211
        222222222211222222222222222222
        222222222222222222222222222222
        222112222222222222222222222222
        221111222222222211222222222222
        221111222222222111122222222222
        222112222222222111122222222222
        222222222222222211222222222222
        ..22222222222222222222211112..
        ....2221122222222222222111....
        `)) {
        mySprite.setVelocity(150, 60)
    }
})
game.onUpdateInterval(50, function () {
    if (controller.left.isPressed() && controller.down.isPressed() == false) {
        Facing_Right = false
        RightLeft_image_check()
        Shooting_Direction = 0
    } else if (controller.right.isPressed() && controller.down.isPressed() == false) {
        Facing_Right = true
        RightLeft_image_check()
        Shooting_Direction = 1
    } else if (controller.down.isPressed()) {
        if (mySprite.image.equals(img`
            ...........22222222...........
            .......2111122222222222.......
            .....2221111222222222222211...
            ....222221122222222222222211..
            .1222222222222222222222222222.
            111222222222222222112222222222
            111222222222222221111222222222
            112222222222222221111222222222
            222222222222222222112222222222
            222222222222222222222222222222
            222222222222222222222222211222
            222222222222112222222222111122
            222222222221111222222222111122
            222222222221111222222222211222
            222222222222112222222222222222
            ..21111222222222222222222222..
            ....1112222222222222211222cc..
            c.....ddddddddddddddddddccccc.
            cc....ddddddddddddddddddbcccc.
            ccc...ddd1fdddd1fdddddddcbbbb.
            .ccc..dddffddddffdddddddccccc.
            ..cccbdddffddddffddddbddccccc.
            ...cbdddddddddddddbddbddbcccc.
            ...cbddddddddddddddbbdddcbbbb.
            .....bddddddddddddddddddccccc.
            ......dddddddddddddddddd.ccc..
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)) {
            mySprite.setImage(img`
                ...........22222222...........
                .....2221111222222222222211...
                ....222221122222222222222211..
                .1222222222222222222222222222.
                111222222222222222112222222222
                111222222222222221111222222222
                112222222222222221111222222222
                222222222222222222112222222222
                222222222222222222222222222222
                222222222222222222222222211222
                222222222222112222222222111122
                222222222221111222222222111122
                222222222221111222222222211222
                222222222222112222222222222222
                ..21111222222222222222222222..
                ....1112222222222222211222....
                `)
        } else if (mySprite.image.equals(img`
            ...........22222222...........
            .......2222222222211112.......
            ...112222222222222111122222...
            ..11222222222222222112222222..
            .2222222222222222222222222221.
            222222222211222222222222222111
            222222222111122222222222222111
            222222222111122222222222222211
            222222222211222222222222222222
            222222222222222222222222222222
            222112222222222222222222222222
            221111222222222211222222222222
            221111222222222111122222222222
            222112222222222111122222222222
            222222222222222211222222222222
            ..22222222222222222222211112..
            ..cc2221122222222222222111....
            .cccccdddddddddddddddddd.....c
            .ccccbdddddddddddddddddd....cc
            .bbbbcdddddddf1ddddf1ddd...ccc
            .cccccdddddddffddddffddd..ccc.
            .cccccddbddddffddddffdddbccc..
            .ccccbddbddbdddddddddddddbc...
            .bbbbcdddbbddddddddddddddbc...
            .cccccddddddddddddddddddb.....
            ..ccc.dddddddddddddddddd......
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)) {
            mySprite.setImage(img`
                ...........22222222...........
                ...112222222222222111122222...
                ..11222222222222222112222222..
                .2222222222222222222222222221.
                222222222211222222222222222111
                222222222111122222222222222111
                222222222111122222222222222211
                222222222211222222222222222222
                222222222222222222222222222222
                222112222222222222222222222222
                221111222222222211222222222222
                221111222222222111122222222222
                222112222222222111122222222222
                222222222222222211222222222222
                ..22222222222222222222211112..
                ....2221122222222222222111....
                `)
        }
    }
})
game.onUpdateInterval(50, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        Is_Jumping = false
        Is_Double_Jumping = false
    }
})
